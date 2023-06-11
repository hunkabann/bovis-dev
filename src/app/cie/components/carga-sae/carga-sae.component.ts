import { Component, OnInit, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { CieService } from '../../services/cie.service';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CieElementPost } from '../../models/cie.models';
import { cieHeaders } from 'src/utils/constants';
import { finalize } from 'rxjs';

interface Option {
  name:   string,
  value:  string,
}

const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-carga-sae',
  templateUrl: './carga-sae.component.html',
  styleUrls: ['./carga-sae.component.css'],
  providers: [MessageService]
})
export class CargaSaeComponent implements OnInit {

  cieService      = inject(CieService)
  messageService  = inject(MessageService)
  sharedService   = inject(SharedService)

  excelData:        any
  jsonData:         CieElementPost[] = []
  cieHeadersLocal:  string[] = cieHeaders

  fileSizeMax: number = 10000000
  isLoadingFile = false
  companyOptions: Option[] = []
  selectedOption: Option
  uploaded = false
  currentFileName: String = ''

  constructor() {}

  ngOnInit(): void {

    this.sharedService.cambiarEstado(true)

    this.cieService.getEmpresas().subscribe(({data}) => {
      this.companyOptions = data.map(empresa => {
        return {
          name: empresa.chempresa,
          value: empresa.nukidempresa.toString()
        }
      })

      this.sharedService.cambiarEstado(false)
    })
  }

  get jsonFormateado() {
    return JSON.stringify(this.jsonData, null, 3)
  }

  async onBasicUpload(event: any, fileUpload: any) {
    this.isLoadingFile = true
    this.uploaded = false
    this.jsonData = []

    this.sharedService.cambiarEstado(true)
    
    const [ file ] = event.files
    const fileReader = new FileReader()
    fileReader.readAsBinaryString( file )

    this.currentFileName = file.name

    fileReader.onload = e => {
      const workBook = XLSX.read( fileReader.result, { type: 'binary' } )
      const [sheetName] = workBook.SheetNames
      this.excelData = XLSX.utils.sheet_to_json( workBook.Sheets[sheetName] )
      let tempNormalRecords: any[] = []
      let lastRecord = false
      let isMiddleDash = false
      let cuentaActual = ''
      // console.log(this.excelData)
      this.excelData.map((record: any, i: number, row: any[]) => {
        lastRecord = (i + 1) === row.length
        isMiddleDash = record.Tipo === '-'
        if(isMiddleDash || lastRecord) {
          cuentaActual = record.__EMPTY
        } else {
          if(record.Concepto)
            tempNormalRecords.push({
              // ...record, 
              nombre_cuenta:      cuentaActual,
              cuenta:             cuentaActual.split(' ')[2],
              tipo_poliza:        record.__EMPTY,
              numero:             +record.Numero,
              fecha:              record.Fecha,
              mes:                record.Fecha.split('/')[1],
              concepto:           record.Concepto,
              centro_costos:      record['Centro de costos']?.trim(),
              proyectos:          record.Proyectos,
              saldo_inicial:      record['Saldo inicial'],
              debe:               record.Debe,
              haber:              record.Haber,
              movimiento:         record.Debe - record.Haber,
              empresa:            this.selectedOption.name.trim(),
              num_proyecto:       record['Centro de costos'] ? +record['Centro de costos'].split('.')[0] : 0,
              tipo_num_proyecto:  '-',
              edo_resultados:     '-',
              responsable:        '-',
              tipo_responsable:   '-',
              tipo_py:            '-',
              clasificacion_py:   '-'
            })
        }
      })
      this.jsonData = tempNormalRecords
    }

    this.isLoadingFile = false
    this.uploaded = true

    this.sharedService.cambiarEstado(false)
    
    fileUpload.clear();
  }

  onChangeCompany(event: any) {
    this.selectedOption = event.value

    this.uploaded = false
  }

  exportJsonToExcel(fileName: string = 'CIE'): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet( [] );

    const workbook: XLSX.WorkBook = {
      Sheets: { 
        'Detalle': worksheet 
      },
      SheetNames: ['Detalle'],
    };

    XLSX.utils.sheet_add_json(worksheet, this.jsonData, { origin: 'A2', skipHeader: true })
    XLSX.utils.sheet_add_aoa(worksheet, [this.cieHeadersLocal]);

    // save to file
    XLSX.writeFile(workbook, `${fileName + '_' + Date.now()}${EXCEL_EXTENSION}`);
  }

  cargar() {
    this.sharedService.cambiarEstado(true)
    // console.log(this.jsonData)
    this.cieService.cargarSae(this.jsonData)
      .pipe(
        finalize(() => {
          this.sharedService.cambiarEstado(false)
        })
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({severity: 'success', summary: 'SAE cargado', detail: 'El SAE ha sido cargado.'})
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Oh no...', detail: err.error})
        }
      })
  }

}
