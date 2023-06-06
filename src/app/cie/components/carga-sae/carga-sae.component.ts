import { Component, OnInit, inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { CieService } from '../../services/cie.service';

interface Option {
  name:   string,
  value:  string,
}

const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-carga-sae',
  templateUrl: './carga-sae.component.html',
  styleUrls: ['./carga-sae.component.css']
})
export class CargaSaeComponent implements OnInit {

  cieService = inject(CieService)

  excelData: any
  jsonData: any = []

  fileSizeMax: number = 1000000
  isLoadingFile = false
  companyOptions: Option[] = []
  selectedOption: Option
  uploaded = false
  currentFileName: String = ''

  constructor() {}

  ngOnInit(): void {
    this.cieService.getEmpresas().subscribe(({data}) => {
      this.companyOptions = data.map(empresa => {
        return {
          name: empresa.chempresa,
          value: empresa.nukidempresa.toString()
        }
      })
    })
  }

  get jsonFormateado() {
    return JSON.stringify(this.jsonData, null, 3)
  }

  async onBasicUpload(event: any, fileUpload: any) {
    this.isLoadingFile = true
    this.uploaded = false
    
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
      this.excelData.map((record: any, i: number, row: any[]) => {
        lastRecord = (i + 1) === row.length
        isMiddleDash = record.Tipo === '-'
        if(isMiddleDash || lastRecord) {
          cuentaActual = record.__EMPTY
        } else {
          if(record.Concepto)
            tempNormalRecords.push({
              // ...record, 
              NombreCuenta: cuentaActual,
              Cuenta:       cuentaActual.split(' ')[2],
              TipoPoliza:   record.__EMPTY,
              Numero:       +record.Numero,
              Fecha:        record.Fecha,
              Mes:          record.Fecha.split('/')[1],
              Concepto:     record.Concepto,
              CentroCostos: record['Centro de costos'].trim(),
              Proyectos:    record.Proyectos,
              SaldoInicial: record['Saldo inicial'],
              Debe:         record.Debe,
              Haber:        record.Haber,
              Movimiento:   record.Debe - record.Haber,
              Empresa:      this.selectedOption.name,
              NumProyecto:  '-',
              TipoP:	      '-',
              EdoDeResultados: '-',
              Responsable:  '-',
              Tipo:         '-',
              TipoPY:       '-',
              ClasificacionPY:  '-'
            })
        }
      })
      this.jsonData = tempNormalRecords
    }
    // fileReader.onload = e => {
    //   const workBook = XLSX.read( fileReader.result, { type: 'binary' } )
    //   const [sheetName] = workBook.SheetNames
    //   this.excelData = XLSX.utils.sheet_to_json( workBook.Sheets[sheetName] )
    //   let counter = 0
    //   let records: any [] = []
    //   let tempRecords: any [] = []
    //   let tempNormalRecords: any[] = []
    //   let lastRecord = false
    //   let isMiddleDash = false
    //   this.excelData.map((record: any, i: number, row: any[]) => {
    //     lastRecord = (i + 1) === row.length
    //     isMiddleDash = record.Tipo === '-'
    //     if(isMiddleDash || lastRecord) {
    //       if(i > 0) {
    //         records[counter - 1] = {
    //           Cuenta:   tempRecords[counter - 1].__EMPTY,
    //           datos:    tempNormalRecords.slice(0, tempNormalRecords.length - 1),
    //           balance:  tempNormalRecords[tempNormalRecords.length - 1]
    //         }
    //         tempNormalRecords = []
    //       }
    //       if(!lastRecord)
    //         tempRecords[counter++] = record
    //       else
    //         this.jsonData = {balance: record}
    //     } else {
    //       tempNormalRecords.push(record)
    //     }
    //   })
    //   this.jsonData = {...this.jsonData, datos: records}
    //   console.log(this.jsonData)
    // }

    this.isLoadingFile = false
    this.uploaded = true
    
    fileUpload.clear();
  }

  onChangeCompany(event: any) {
    this.selectedOption = event.value
  }

  public exportJsonToExcel(fileName: string = 'CIE'): void {
    // inserting first blank row
    // this.jsonData = [{'x': 1, 'y': 2, 'z': 3}, {'x': 1, 'y': 2, 'z': 3}]
    let Heading = [['FirstName', 'Last Name', 'Email']];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet( [] );

    const workbook: XLSX.WorkBook = {
      Sheets: { 
        'Detalle': worksheet 
      },
      SheetNames: ['Detalle'],
    };

    const headings = [[
      'NOMBRE CUENTA',
      'CUENTA',
      'TIPO POLIZA',
      'NUMERO',
      'FECHA',
      'MES',
      'CONCEPTO',
      'CENTRO DE COSTOS',
      'PROYECTOS',
      'SALDO INICIAL',
      'DEBE',
      'HABER',
      'MOVIMIENTO',
      'EMPRESA',
      'NUM PROYECTO',
      'TIPO',
      'EDO DE RESULTADOS',
      'RESPONSABLE',
      'TIPO',
      'TIPO PY',
      'CLASIFICACION PY'
    ]]
    XLSX.utils.sheet_add_json(worksheet, this.jsonData, { origin: 'A2', skipHeader: true })
    XLSX.utils.sheet_add_aoa(worksheet, headings);
    // save to file
    XLSX.writeFile(workbook, `${fileName + '_' + Date.now()}${EXCEL_EXTENSION}`);
  }

}
