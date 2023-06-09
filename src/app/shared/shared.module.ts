import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from './primeng.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

//Components
import { FailedComponent } from './components/failed/failed.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FailedComponent,
    MenuSidebarComponent,
    BackdropComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    FailedComponent,
    MenuSidebarComponent,
    BackdropComponent
  ]
})
export class SharedModule { }
