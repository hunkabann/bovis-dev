import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CargarHorasResponse, CatEmpleadoResponse, DiasHabilesResponse, EmpleadoProyectoResponse } from '../models/timesheet.model';
import { Observable, map, of } from 'rxjs';

type sabadosOpciones = 'SI' | 'NO'

interface Dias {
  habiles:  number,
  feriados: number
}

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

  getDiasHabiles(mes: number, anio: number, sabados: sabadosOpciones): Observable<Dias> {
    return this.http.get<DiasHabilesResponse>(`${this.baseUrl}api/Timesheet/DiasHabiles/${mes}/${anio}/${sabados === 'SI' ? 'true' : 'false'}`)
      .pipe(map(pre_info => pre_info.data))
      .pipe(map(info => {
        if(!info) return {habiles: 0, feriados: 0}

        return {habiles: info.dias_habiles, feriados: info.feriados}
      }))
  }

  getProyectos(empleadoId: number) {
    return this.http.get<EmpleadoProyectoResponse>(`${this.baseUrl}api/Empleado/Proyectos/${empleadoId}`)
  }

  cargarHoras(body: any) {
    return this.http.post<CargarHorasResponse>(`${this.baseUrl}api/Timesheet/Registro/Agregar`, body)
  }
}
