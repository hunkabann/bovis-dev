import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcsRoutingModule } from './pcs-routing.module';
import { PcsComponent } from './container/pcs.component';
import { IpComponent } from './components/ip/ip.component';
import { StaffingPlanComponent } from './components/staffing-plan/staffing-plan.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { ControlComponent } from './components/control/control.component';
import { PpaKpiComponent } from './components/ppa-kpi/ppa-kpi.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { PrimengModule } from '../shared/primeng.module';


@NgModule({
  declarations: [
    PcsComponent,
    IpComponent,
    StaffingPlanComponent,
    GastosComponent,
    IngresosComponent,
    ControlComponent,
    PpaKpiComponent
  ],
  imports: [
    CommonModule,
    PcsRoutingModule,
    PrimengModule,
    TabMenuModule
  ]
})
export class PcsModule { }
