import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CatEmpleado, CatPersona, CatalogoResponse, Persona } from '../Models/empleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  baseUrl = environment.urlApiBovis;

  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  getEstadoCivil() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/EstadoCivil/`);
  }

  getTipoSangre() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoSangre/`);
  }

  getTipoPersona() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoPersona/`);
  }

  getTipoSexo() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Sexo/`);
  }

  getCatPersonas() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoPersona/`);
  }

  getCatEmpleados() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoEmpleado/`);
  }

  getCatCategorias() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/categoria/`);
  }

  getCatTiposContratos() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoContrato/`);
  }

  getCatCiudades() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/ciudad/`);
  }

  getCatNivelEstudios() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/NivelEstudios/`);
  }

  getCatFormasPago() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/FormaPago/`);
  }

  getCatJornadas() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Jornada/`);
  }

  getCatDepartamentos() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Departamento/`);
  }

  getCatClasificacion() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/Clasificacion/`);
  }

  getCatUnidadNegocio() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/UnidadNegocio/`);
  }

  getPersonas() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/persona/Consultar`);
  }

  savePersona(persona: Persona): Observable<any> {
    return this.http.put(`${this.baseUrl}api/empleado/persona/Agregar`, persona, { headers: this.httpHeaders });
  }

  getEmpleados() {
    return this.http.get<any>(`${this.baseUrl}api/empleado/Consultar`);
  }

  // Hecho por sebastian.flores

  getCategorias() {
    return this.http.get<CatalogoResponse>(`${this.baseUrl}api/Catalogo/Categoria`)
  }

  getPuestos() {
    return this.http.get<CatalogoResponse>(`${this.baseUrl}api/Catalogo/Puesto`)
  }

  getNivelEstudios() {
    return this.http.get<CatalogoResponse>(`${this.baseUrl}api/Catalogo/NivelEstudios`)
  }

  getJornadas() {
    return this.http.get<CatalogoResponse>(`${this.baseUrl}api/Catalogo/Jornada`)
  }

  getHabilidades() {
    return this.http.get<CatalogoResponse>(`${this.baseUrl}api/Catalogo/Habilidad`)
  }

  getExperiencias() {
    return this.http.get<CatalogoResponse>(`${this.baseUrl}api/Catalogo/Experiencia`)
  }

  // ./ Hecho por sebastian.flores

  saveEmpleado(empleado: CatEmpleado): Observable<any> {
    console.log(empleado);
    return this.http.put(`${this.baseUrl}api/empleado/Agregar`, empleado, { headers: this.httpHeaders });
  }

}
