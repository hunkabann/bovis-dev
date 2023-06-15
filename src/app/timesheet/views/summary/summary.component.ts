import { Component, OnInit, inject } from '@angular/core';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { TimesheetService } from '../../services/timesheet.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';
import { Timesheet } from '../../models/timesheet.model';
import * as XLSX from 'xlsx';

import { EXCEL_EXTENSION, PERCENTAGE_FORMAT } from 'src/utils/constants';

interface ProyectoShort {
  id:           number,
  nombre:       string,
  dedicacion?:  number
}

interface Informacion {
  timesheet: Timesheet,
  participacion: ProyectoShort[]
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  providers: [MessageService]
})
export class SummaryComponent implements OnInit {

  timeSheetService  = inject(TimesheetService)
  sharedService     = inject(SharedService)

  proyectos:  ProyectoShort[] = []
  data: Informacion[] = []

  constructor() { }

  ngOnInit(): void {
    this.sharedService.cambiarEstado(true)
    this.timeSheetService.getCatProyectos()
      .subscribe(({data}) => {
        this.proyectos = data.map(({numProyecto, nombre}) => ({id: numProyecto, nombre, dedicacion: 0 }))
        this.sharedService.cambiarEstado(false)
      })
  }

  get totalPorcentaje() {
    let total = 0
    this.data.forEach(({timesheet}) => {
      timesheet.proyectos.forEach(proyecto => {
        total += proyecto.tDedicacion
      })
    })
    return total
  }

  onSelectFecha(event: any) {
    const mes = format(event, 'M')
    const anio = format(event, 'Y')
    
    this.sharedService.cambiarEstado(true)
    this.timeSheetService.getTimeSheetsPorFecha(+mes, +anio)
      .pipe(
        finalize(() => {
          this.sharedService.cambiarEstado(false)
        })
      )
      .subscribe(({data}) => {
        this.data = data.map(timesheet => ({
          timesheet,
          participacion: this.proyectos.map((proyecto, index) => {

            const key = timesheet.proyectos.findIndex(({idProyecto}) => idProyecto === proyecto.id)
            let dedicacion = 0
            if(key >= 0) {
              // console.log(timesheet.proyectos[key].tDedicacion)
              dedicacion = timesheet.proyectos[key].tDedicacion
              this.proyectos[index].dedicacion += dedicacion
            }
            return {
              id:         proyecto.id,
              nombre:     proyecto.nombre,
              dedicacion
            }
          })
        }))
        // console.log(this.proyectos)
      })
  }
  
  exportJsonToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet( [] );

    const workbook: XLSX.WorkBook = {
      Sheets: { 
        'Detalle': worksheet 
      },
      SheetNames: ['Detalle'],
    };

    let indiceFooter = 2
    let datosMatriz = {
      a: {x: 8, y: 1},
      b: {x: 8, y: 1}
    }
    const jsonData = this.data.map(record => {

      const dedicacion: any = {}
      let totalTimesheet = 0

      record.participacion.forEach((proyecto, index) => {
        const property            = `proyecto${index}`
        dedicacion[property]      = this.getDecimal(proyecto.dedicacion)
        totalTimesheet            += +proyecto.dedicacion
      })

      indiceFooter++
      datosMatriz.b.y = indiceFooter

      return {
        fijo1:          1,
        coi_empresa:    record.timesheet.coi_empresa,
        noi_empresa:    record.timesheet.noi_empresa,
        noi_empleado:   record.timesheet.noi_empleado,
        num_empleado:   record.timesheet.num_empleado,
        fijo2:          1,
        empleado:       record.timesheet.empleado,
        responsable:    record.timesheet.responsable,
        totalTimesheet: this.getDecimal(totalTimesheet),
        ...dedicacion
      }
    });

    const proyectosHeader: any = {}
    const proyectosDedicacion: any = {}

    this.proyectos.forEach((proyecto, index) => {
      const property                = `proyecto${index}`
      proyectosHeader[property]     = proyecto.id
      proyectosDedicacion[property] = this.getDecimal(proyecto.dedicacion)
    })

    const headers = [{
      a1:   '0000',
      a2:   '',
      a3:   'Empleado',
      a4:   'Responsable',
      a5:   0,
      ...proyectosHeader
    }]

    const footer = [{
      a1:   this.getDecimal(this.totalPorcentaje),
      ...proyectosDedicacion
    }]

    XLSX.utils.sheet_add_json(worksheet, headers, { origin: 'E1', skipHeader: true })
    XLSX.utils.sheet_add_json(worksheet, jsonData, { origin: 'A2', skipHeader: true })
    XLSX.utils.sheet_add_json(worksheet, footer, { origin: `I${indiceFooter}`, skipHeader: true })

    Object.keys(footer[0]).forEach(key => datosMatriz.b.x++)
    for (let row = datosMatriz.a.y; row < datosMatriz.b.y; row++) {
      for (let col = datosMatriz.a.x; col < datosMatriz.b.x; col++) {
        this.formatPercentage(worksheet, row, col)
      }
    }

    this.formatPercentage(worksheet, 0, 8)

    // save to file
    XLSX.writeFile(workbook, `Summary_${Date.now()}${EXCEL_EXTENSION}`);
  }

  getDecimal(value: number) {
    return (value / 100)
  }

  formatPercentage(worksheet: XLSX.WorkSheet, row: number, col: number) {
    const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
    const cell = worksheet[cellRef];
    
    cell.t = 'n';
    cell.z = PERCENTAGE_FORMAT;
  }

}
