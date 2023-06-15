import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CieElementPost, CieEmpresasResponse, CieProyectosResponse } from '../models/cie.models';

interface StringRequest {
  data: string[]
}

@Injectable({
  providedIn: 'root'
})
export class CieService {

  baseUrl = environment.urlApiBovis;

  constructor(private http: HttpClient) { }

  getEmpresas() {
    return this.http.get<CieEmpresasResponse>(`${this.baseUrl}api/Cie/Empresas/true`);
  }

  cargarSae(data: CieElementPost[]) {
    return this.http.post<any>(`${this.baseUrl}api/Cie/Registros/Agregar`, {data})
  }

  getInfoCuentas(body: StringRequest) {
    return this.http.post<any>(`${this.baseUrl}api/Cie/Cuentas`, body)
  }

  getInfoProyectos(body: StringRequest) {
    return this.http.post<CieProyectosResponse>(`${this.baseUrl}api/Cie/Proyectos`, body)
  }
  
}
