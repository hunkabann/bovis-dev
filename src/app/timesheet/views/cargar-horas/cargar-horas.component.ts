import { Component, OnInit, inject } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';

interface Opcion {
  name: string,
  code: string
}

@Component({
  selector: 'app-cargar-horas',
  templateUrl: './cargar-horas.component.html',
  styleUrls: ['./cargar-horas.component.css']
})
export class CargarHorasComponent implements OnInit {

  empleados: Opcion[] = []

  timesheetService = inject(TimesheetService)

  constructor() { }

  ngOnInit(): void {
    this.timesheetService.getEmpleados().subscribe(({data: items}) => {
      items.map(item => this.empleados.push({name: item.chemail_bovis, code: item.nunum_empleado_rr_hh.toString()}))
    })
  }

  guardar() {

  }
}
