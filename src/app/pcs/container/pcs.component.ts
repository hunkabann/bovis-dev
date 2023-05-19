import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pcs',
  templateUrl: './pcs.component.html',
  styleUrls: ['./pcs.component.css']
})
export class PcsComponent implements OnInit {
  
  items: MenuItem[] = [
    { label: 'IP', routerLink: 'ip' },
    { label: 'Staffing Plan', routerLink: 'staffing-plan' },
    { label: 'Gastos', routerLink: 'gastos' },
    { label: 'Ingresos', routerLink: 'ingresos' },
    { label: 'Control', routerLink: 'control' },
    { label: 'PPA-KPI', routerLink: 'ppa-kpi' }
  ]

  activeItem: MenuItem;

  constructor() { }

  ngOnInit(): void {}

  onActiveItemChange(event: any){
    this.activeItem = event
  }

}
