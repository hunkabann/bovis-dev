import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { CargarHorasComponent } from './views/cargar-horas/cargar-horas.component';
import { ConsultarComponent } from './views/consultar/consultar.component';
import { PrimengModule } from '../shared/primeng.module';


@NgModule({
  declarations: [
    CargarHorasComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    PrimengModule
  ]
})
export class TimesheetModule { }
