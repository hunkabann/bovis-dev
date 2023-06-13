import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargarHorasComponent } from './views/cargar-horas/cargar-horas.component';
import { ConsultarComponent } from './views/consultar/consultar.component';

const routes: Routes = [
  {
    path: 'cargar-horas',
    component: CargarHorasComponent
  },
  {
    path: 'cargar-horas/:id',
    component: CargarHorasComponent
  },
  {
    path: 'consultar',
    component: ConsultarComponent
  },
  {
    path: '**',
    redirectTo: 'cargar-horas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule { }
