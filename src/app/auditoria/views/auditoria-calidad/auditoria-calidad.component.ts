import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-auditoria-calidad',
  templateUrl: './auditoria-calidad.component.html',
  styleUrls: ['./auditoria-calidad.component.css']
})
export class AuditoriaCalidadComponent {

  items: MenuItem[] = [
    { label: 'Seleccionar documentos del proyecto', routerLink: 'seleccionar' },
    { label: 'Carga de documentos', routerLink: 'cargar' },
    { label: 'Seguimiento de auditoria', routerLink: 'seguimiento' },
  ]

  activeItem: MenuItem;

  constructor() { }

  onActiveItemChange(event: any){
    this.activeItem = event
  }

}
