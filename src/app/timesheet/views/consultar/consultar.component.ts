import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Opcion } from 'src/models/general.model';
import { TimesheetService } from '../../services/timesheet.service';
import { Timesheet } from '../../models/timesheet.model';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  providers: [MessageService]
})
export class ConsultarComponent implements AfterViewInit {

  activatedRoute    = inject(ActivatedRoute)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)
  timesheetService  = inject(TimesheetService)

  empleados:  Opcion[] = []
  timesheets: Timesheet[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.verificarEstado()

    this.sharedService.cambiarEstado(true)

    this.timesheetService.getEmpleados()
      .subscribe(({data}) => {
        this.empleados = data.map(({nunum_empleado_rr_hh, nombre_persona}) => ({name: nombre_persona, code: nunum_empleado_rr_hh.toString()}))
        this.sharedService.cambiarEstado(false)
      })
  }

  verificarEstado() {

    this.activatedRoute.queryParams.subscribe(params => {
      // Access query parameters
      const success = params['success']

      if(success) {
        Promise.resolve().then(() => this.messageService.add({ severity: 'success', summary: 'Horas guardadas', detail: 'Las horas han sido guardadas.' }))
      }
    });
  }

  buscarRegistros(event: any) {
    // this.sharedService.cambiarEstado(true)
    const id = event.value.code
    this.timesheetService.getTimeSheetsPorEmpleado(id).subscribe(({data}) => {
      this.timesheets = []
      data.map(ts => this.timesheets.push(ts))
      this.sharedService.cambiarEstado(false)
    })
  }

}
