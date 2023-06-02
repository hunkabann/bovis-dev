import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditoriaRoutingModule } from './auditoria-routing.module';
import { AuditoriaLegalComponent } from './views/auditoria-legal/auditoria-legal.component';
import { AuditoriaCalidadComponent } from './views/auditoria-calidad/auditoria-calidad.component';
import { SeleccionarDocumentosComponent } from './components/auditoria-calidad/seleccionar-documentos/seleccionar-documentos.component';
import { CargarDocumentosComponent } from './components/auditoria-calidad/cargar-documentos/cargar-documentos.component';
import { SeguimientoComponent } from './components/auditoria-calidad/seguimiento/seguimiento.component';
import { TabMenuModule } from 'primeng/tabmenu';


@NgModule({
  declarations: [
    AuditoriaLegalComponent,
    AuditoriaCalidadComponent,
    SeleccionarDocumentosComponent,
    CargarDocumentosComponent,
    SeguimientoComponent
  ],
  imports: [
    CommonModule,
    AuditoriaRoutingModule,
    TabMenuModule
  ]
})
export class AuditoriaModule { }
