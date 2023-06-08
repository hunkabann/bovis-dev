import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './container/empleados.component';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from "primeng/api";
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { PersonaRegistroComponent } from './components/persona-registro/persona-registro.component';
import { MessagesModule } from 'primeng/messages';
import { EmpleadosPrincipalComponent } from './components/empleados-principal/empleados-principal.component';
import { GenerarRequerimientoComponent } from './components/generar-requerimiento/generar-requerimiento.component';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadosRegistroComponent,
    PersonaRegistroComponent,
    EmpleadosPrincipalComponent,
    GenerarRequerimientoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmpleadosRoutingModule,
    ConfirmPopupModule,
    ToastModule,
    DropdownModule,
    ProgressBarModule,
    CalendarModule,
    AccordionModule,
    MessagesModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
    CheckboxModule
  ],
  exports:[

  ],
  providers: [ConfirmationService, MessageService]
})
export class EmpleadosModule { }
