import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuditoriaLegalComponent } from './views/auditoria-legal/auditoria-legal.component';
import { SeleccionarDocumentosComponent as SeleccionarLegal } from './components/auditoria-legal/seleccionar-documentos/seleccionar-documentos.component';
import { CargarDocumentosComponent as CargarLegal } from './components/auditoria-legal/cargar-documentos/cargar-documentos.component';
import { SeguimientoComponent as SeguimientoLegal } from './components/auditoria-legal/seguimiento/seguimiento.component';

import { AuditoriaCalidadComponent } from './views/auditoria-calidad/auditoria-calidad.component';
import { SeleccionarDocumentosComponent as SeleccionarCalidad } from './components/auditoria-calidad/seleccionar-documentos/seleccionar-documentos.component';
import { CargarDocumentosComponent as CargarCalidad } from './components/auditoria-calidad/cargar-documentos/cargar-documentos.component';
import { SeguimientoComponent as SeguimientoCalidad } from './components/auditoria-calidad/seguimiento/seguimiento.component';

const routes: Routes = [
  {
    path: 'auditoria-legal',
    component: AuditoriaLegalComponent,
    children: [
      {
        path: 'seleccionar',
        component: SeleccionarLegal
      },
      {
        path: 'cargar',
        component: CargarLegal
      },
      {
        path: 'seguimiento',
        component: SeguimientoLegal
      },
      {
        path: '**',
        redirectTo: 'seleccionar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'auditoria-calidad',
    component: AuditoriaCalidadComponent,
    children: [
      {
        path: 'seleccionar',
        component: SeleccionarCalidad
      },
      {
        path: 'cargar',
        component: CargarCalidad
      },
      {
        path: 'seguimiento',
        component: SeguimientoCalidad
      },
      {
        path: '**',
        redirectTo: 'seleccionar',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auditoria-legal',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditoriaRoutingModule { }
