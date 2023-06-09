import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css'],
})
export class MenuSidebarComponent implements OnInit {
  @Output() nameModule = new EventEmitter<string>();

  rol: string;
  _accesos: any = [];
  get accesos(): any {
    return this._accesos;
  }
  @Input() set accesos(value: any) {
    //console.log(value);
    if (value) {
      this._accesos = value;
      this.rol = value[0].split('.')[0];
      // console.log(this.rol);
    }
  }

  menu: MegaMenuItem[] = [];
  perfilesMenu: MegaMenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.perfilesMenu = [];
    this.menu = [
      {
        title: 'EMPLEADOS',
        icon: 'icon-empleado',
        items: [
          [
            {
              label: 'EMPLEADOS',
              items: [
                {
                  label: 'Generar requerimiento',
                  routerLink: ['/empleados/generar-requerimiento'],
                  command: () =>
                    this.setModule('Generar Requerimiento'.toUpperCase()),
                },
                {
                  label: 'Ver requerimientos',
                },
                {
                  label: 'Asignar empleado a requerimiento',
                },
                {
                  label: 'Modificar empleados',
                },
                {
                  label: 'Carga persona',
                  routerLink: ['/empleados/persona'],
                  command: () =>
                    this.setModule('Registro de Persona'.toUpperCase()),
                },
                {
                  label: 'Carga empleados',
                  routerLink: ['/empleados/empleado-pri'],
                  command: () =>
                    this.setModule('Registro de Empleado'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'TIMESHEET',
        icon: 'icon-timesheet',
        items: [
          [
            {
              label: 'TIMESHEET',
              items: [
                {
                  label: 'Cargar Horas',
                  routerLink: ['timesheet/cargar-horas'],
                  command: () =>
                    this.setModule('Timesheet'.toUpperCase()),
                },
                {
                  label: 'Consultar / Modificar',
                  routerLink: ['timesheet/consultar'],
                  command: () =>
                    this.setModule('Timesheet'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'COSTO DE EMPLEADOS',
        icon: 'icon-costos',
        items: [
          [
            {
              label: 'COSTO DE EMPLEADOS',
              items: [
                {
                  label: 'Costo por empleado',
                },
                {
                  label: 'Costo por proyecto',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'CIE',
        icon: 'icon-cie',
        items: [
          [
            {
              label: 'CIE',
              items: [
                {
                  label: 'Carga de SAE',
                  routerLink: ['cie/carga-sae'],
                  command: () =>
                    this.setModule('CIE'.toUpperCase()),
                },
                {
                  label: 'CEI – Resultado búsqueda',
                  routerLink: ['cie/resultado-busqueda'],
                  command: () =>
                    this.setModule('CIE'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'PCS',
        icon: 'icon-pcs',
        routerLink: ['pcs/ip'],
        command: () =>
          this.setModule('PCS'.toUpperCase()),
      },
      {
        title: 'AUDITORIA',
        icon: 'icon-auditoria-legal',
        items: [
          [
            {
              label: 'AUDITORIA',
              items: [
                {
                  label: 'Auditoría Legal',
                  routerLink: ['auditoria/auditoria-legal'],
                  command: () =>
                    this.setModule('Auditoría Legal'.toUpperCase()),
                },
                {
                  label: 'Auditoría de Calidad',
                  routerLink: ['auditoria/auditoria-calidad'],
                  command: () =>
                    this.setModule('Auditoría de Calidad'.toUpperCase()),
                }
              ],
            },
          ],
        ],
      },
      {
        title: 'REPORTES',
        icon: 'icon-reportes',
        routerLink: 'reportes',
      },
      {
        title: 'PEC',
        icon: 'icon-pec',
        items: [
          [
            {
              label: 'PEC',
              items: [
                {
                  label: 'Captura',
                  routerLink: ['pec/captura'],
                  command: () =>
                    this.setModule('PLATAFORMA DE EXCELENCIA CORPORATIVA'.toUpperCase()),
                },
                {
                  label: 'Consulta/Evaluación',
                  routerLink: ['pec/evaluacion'],
                  command: () =>
                    this.setModule('PLATAFORMA DE EXCELENCIA CORPORATIVA'.toUpperCase()),
                },
                {
                  label: 'Aceptar objetivos',
                  routerLink: ['pec/objetivos'],
                  command: () =>
                    this.setModule('PLATAFORMA DE EXCELENCIA CORPORATIVA'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'FACTURACIÓN',
        icon: 'icon-facturacion',
        items: [
          [
            {
              label: 'FACTURACIÓN',
              items: [
                {
                  label: 'Carga CFDI',
                  routerLink: ['facturacion/carga-cfdi'],
                  command: () =>
                    this.setModule('FACTURACIÓN - CARGA CFDI'.toUpperCase()),
                },
                {
                  label: 'NC',
                  routerLink: ['facturacion/nota-credito'],
                  command: () =>
                  this.setModule('FACTURACIÓN - NC'.toUpperCase()),
                },
                {
                  label: 'CRP',
                  routerLink: ['facturacion/crp'],
                  command: () =>
                  this.setModule('FACTURACIÓN - CRP'.toUpperCase()),
                },
                {
                  label: 'Busqueda/Cancelación',
                  routerLink: ['facturacion/cancelacion'],
                  command: () =>
                  this.setModule('FACTURACIÓN - CANCELACIÓN'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'ADMINISTRACIÓN',
        icon: 'pi pi-fw pi-briefcase',
      },
      {
        title: 'CATALOGOS',
        icon: 'pi pi-fw pi-book',
        items: [
          [
            {
              label: 'CATALOGOS',
              items: [
                {
                  label: 'CATALOGOS',
                  routerLink: ['catalogos'],
                },
              ],
            },
          ],
        ],
      },
    ];

    //console.log(this.items);
    this.getMenuPerfiles();
  }


  getMenuPerfiles(){

    //EMPLEADOS
    if(this.rol == 'eje' || this.rol == 'it' || this.rol == 'eje' || this.rol == 'nom' || this.rol == 'admin' || this.rol == 'rh' || this.rol == 'legal' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[0]);
    }

    //TIMESHEET
    if(this.rol == 'nom' || this.rol == 'it' || this.rol == 'admfin' || this.rol == 'admin' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[1]);
    }

    //COSTO DE EMPLEADOS
    if(this.rol == 'nom' || this.rol == 'it' || this.rol == 'admin' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[2]);
    }

    //CIE
    if(this.rol == 'nom' || this.rol == 'eje' || this.rol == 'it' || this.rol == 'admfin' || this.rol == 'admin' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[3]);
    }

    //PCS
    if(this.rol == 'eje' || this.rol == 'it' || this.rol == 'eje' || this.rol == 'adminfin' || this.rol == 'admin' || this.rol == 'rh' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[4]);
    }

     //AUDITORIA LEGAL
     if(this.rol == 'legal' || this.rol == 'eje' || this.rol == 'it' || this.rol == 'adminfin' || this.rol == 'admin' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[5]);
    }

     //REPORTES
     if(this.rol == 'eje' || this.rol == 'it' || this.rol == 'eje' || this.rol == 'adminfin' || this.rol == 'admin' || this.rol == 'rh' || this.rol == 'legal' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[6]);
    }

     //PEC
     if(this.rol == 'admfin' || this.rol == 'it' || this.rol == 'admin' || this.rol == 'eje' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[7]);
    }

     //FACTURACIÓN
     if(this.rol == 'nom' || this.rol == 'it' || this.rol == 'admfin' || this.rol == 'admin' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[8]);
    }

    //CATALOGOS
    if(this.rol == 'nom' || this.rol == 'rh' || this.rol == 'it' || this.rol == 'eje' || this.rol == 'dev'){
      this.perfilesMenu.push(this.menu[10]);
    }

  }


  setModule(name: any) {
    // console.log(name);
    this.nameModule.next(name);
  }
}
