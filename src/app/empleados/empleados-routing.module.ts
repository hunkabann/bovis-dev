import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
import { EmpleadosComponent } from './container/empleados.component';
import { PersonaRegistroComponent } from './components/persona-registro/persona-registro.component';
import { EmpleadosPrincipalComponent } from './components/empleados-principal/empleados-principal.component';
import { GenerarRequerimientoComponent } from './components/generar-requerimiento/generar-requerimiento.component';
import { RequerimientosComponent } from './components/requerimientos/requerimientos.component';
import { ModificarRequerimientoComponent } from './components/modificar-requerimiento/modificar-requerimiento.component';

const routes: Routes = [
  { path: 'persona', component: EmpleadosComponent},
  { path: 'empleado-pri', component: EmpleadosPrincipalComponent},
  { path: 'registro-empleado', component: EmpleadosRegistroComponent},
  { path: 'registro-persona', component: PersonaRegistroComponent},
  { path: 'edicion/:id', component: EmpleadosRegistroComponent},
  { path: 'consulta/:id', component: EmpleadosRegistroComponent},
  { path: 'generar-requerimiento', component: GenerarRequerimientoComponent},
  { path: 'modificar-requerimiento/:id', component: ModificarRequerimientoComponent},
  { path: 'requerimientos', component: RequerimientosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
