import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  _cargando: boolean = false

  constructor() { }

  get cargando() {
    return this._cargando
  }
  
  cambiarEstado(estado: boolean) {
    Promise.resolve().then(() => this._cargando = estado)
  }
}
