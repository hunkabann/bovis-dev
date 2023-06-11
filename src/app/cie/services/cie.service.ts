import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CieElementPost, CieEmpresasResponse } from '../models/cie.models';

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
    console.log({data})
    // TODO: ajustar el tipo
    return this.http.post<any>(`${this.baseUrl}api/Cie/Registros/Agregar`, {data})
  }
  
}
