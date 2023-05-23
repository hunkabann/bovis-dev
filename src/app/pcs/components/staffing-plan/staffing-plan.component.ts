import { Component, OnInit } from '@angular/core';

interface Etapa {
  nombre:     string,
  totalMeses: number,
  meses:      boolean[],
}

@Component({
  selector: 'app-staffing-plan',
  templateUrl: './staffing-plan.component.html',
  styleUrls: ['./staffing-plan.component.css']
})
export class StaffingPlanComponent implements OnInit {

  meses: String[] = ['Jun-23', 'Jul-23', 'Ago-23', 'Sep-23', 'Oct-23', 'Nov-23']
  etapas: Etapa[] = [
    { nombre: 'Historia', totalMeses: 0, meses: [] },
    { nombre: 'Fase 2', totalMeses: 0, meses: [] },
    { nombre: 'Fase 3', totalMeses: 0, meses: [] }
  ] 

  get jsonEtapas(): string {
    return JSON.stringify(this.etapas, null, 3)
  }

  get duracionMeses(): number {
    let total = 0
    this.etapas.map(etapa => {
      total += etapa.totalMeses
    })
    return total
  }

  constructor() {
    this.etapas = this.etapas.map(etapa => {
      return {...etapa, meses: this.meses.map(mes => false)}
    })
  }

  ngOnInit(): void {
  }

  toggleOpcion(etapa: Etapa, indice: number) {
    etapa.meses[indice] = !etapa.meses[indice]
    etapa.totalMeses = etapa.meses.filter(valor => valor).length
    console.log([etapa, indice])
  }

}
