import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { CargarHorasComponent } from './views/cargar-horas/cargar-horas.component';
import { ConsultarComponent } from './views/consultar/consultar.component';
import { PrimengModule } from '../shared/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    CargarHorasComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    RadioButtonModule
  ]
})
export class TimesheetModule { }
