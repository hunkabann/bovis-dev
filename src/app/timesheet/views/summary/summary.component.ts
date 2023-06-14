import { Component, OnInit, inject } from '@angular/core';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { TimesheetService } from '../../services/timesheet.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';
import { Timesheet } from '../../models/timesheet.model';

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
        this.proyectos = data.map(({numProyecto, nombre}) => ({id: numProyecto, nombre }))
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
          participacion: this.proyectos.map(proyecto => {

            const key = timesheet.proyectos.findIndex(({idProyecto}) => idProyecto === proyecto.id)
            let dedicacion = 0
            if(key >= 0) {
              // console.log(timesheet.proyectos[key].tDedicacion)
              dedicacion = timesheet.proyectos[key].tDedicacion
            }
            return {
              id:         proyecto.id,
              nombre:     proyecto.nombre,
              dedicacion
            }
          })
        }))

        // console.log(this.data)
      })
  }

}
