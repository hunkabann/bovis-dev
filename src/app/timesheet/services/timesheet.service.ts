import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CatEmpleadoResponse } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  baseUrl = environment.urlApiBovis;

  http = inject(HttpClient)

  constructor() { }

  getEmpleados() {
    return this.http.get<CatEmpleadoResponse>(`${this.baseUrl}api/Empleado/Empleados/true`)
  }
}
