import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CieService } from '../../services/cie.service';

interface Options {
  name:   string,
  value:  string,
}

@Component({
  selector: 'app-carga-sae',
  templateUrl: './carga-sae.component.html',
  styleUrls: ['./carga-sae.component.css']
})
export class CargaSaeComponent implements OnInit {

  excelData: any
  jsonData: any = []

  fileSizeMax: number = 1000000
  isXlsx = true
  isLoadingFile = false
  companyOptions: Options[] = [
    { name: 'Empresa 1', value: 'E1' },
    { name: 'Empresa 2', value: 'E2' }
  ]

  constructor(private cieService: CieService) {
    cieService.getEmpresas().subscribe(({data}) => {
      this.companyOptions = data.map(empresa => {
        return {
          name: empresa.chempresa,
          value: empresa.nukidempresa.toString()
        }
      })
    })
  }

  ngOnInit(): void {
  }

  get jsonFormateado() {
    return JSON.stringify(this.jsonData, null, 3)
  }

  async onBasicUpload(event: any) {
    this.isLoadingFile = true
  
    console.log('load xlsx data...')
    
    const [ file ] = event.files
    const fileReader = new FileReader()
    fileReader.readAsBinaryString( file )

    console.clear()
    fileReader.onload = e => {
      const workBook = XLSX.read( fileReader.result, { type: 'binary' } )
      const [sheetName] = workBook.SheetNames
      this.excelData = XLSX.utils.sheet_to_json( workBook.Sheets[sheetName] )
      let counter = 0
      let records: any [] = []
      let tempRecords: any [] = []
      let tempNormalRecords: any[] = []
      let lastRecord = false
      let isMiddleDash = false
      this.excelData.map((record: any, i: number, row: any[]) => {
        lastRecord = (i + 1) === row.length
        isMiddleDash = record.Tipo === '-'
        if(isMiddleDash || lastRecord) {
          if(i > 0) {
            records[counter - 1] = {
              Cuenta:   tempRecords[counter - 1].__EMPTY,
              datos:    tempNormalRecords.slice(0, tempNormalRecords.length - 1),
              balance:  tempNormalRecords[tempNormalRecords.length - 1]
            }
            tempNormalRecords = []
          }
          if(!lastRecord)
            tempRecords[counter++] = record
          else
            this.jsonData = {balance: record}
        } else {
          tempNormalRecords.push(record)
        }
      })
      this.jsonData = {...this.jsonData, datos: records}
      console.log(this.jsonData)
    }

    this.isLoadingFile = false
  }

  onChangeCompany(event: any) {
    console.log(event)
  }

}
