import { Component, OnInit, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';

interface Requerimiento {
  profesion:    string,
  sueldo:       RangoSueldo,
  habilidades:  string[],
  experiencias: string[]
}

interface RangoSueldo {
  min: number,
  max: number
}

interface Opcion {
  name: string,
  code: string
}

@Component({
  selector: 'app-generar-requerimiento',
  templateUrl: './generar-requerimiento.component.html',
  styleUrls: ['./generar-requerimiento.component.css']
})
export class GenerarRequerimientoComponent implements OnInit {

  requerimiento: Requerimiento = {
    profesion:    '',
    sueldo:       {
      min: 0.00,
      max: 1000.00
    },
    habilidades:  [],
    experiencias: []
  }

  empleadosService = inject(EmpleadosService)

  categorias:     Opcion[] = []
  puestos:        Opcion[] = []
  nivelEstudios:  Opcion[] = []
  jornadas:       Opcion[] = []

  habilidadesDisponibles: Opcion[] = []

  experienciasDisponibles: Opcion[] = []

  constructor() { }

  ngOnInit(): void {
    // Llenamos el select de categorías
    this.empleadosService.getCategorias().subscribe(({data: items}) => {
      items.map(item => this.categorias.push({name: item.descripcion, code: item.id.toString()}))
    })

    // Llenamos el select de puestos
    this.empleadosService.getPuestos().subscribe(({data: items}) => {
      items.map(item => this.puestos.push({name: item.descripcion, code: item.id.toString()}))
    })

    // Llenamos el select de nivel de estudios
    this.empleadosService.getNivelEstudios().subscribe(({data: items}) => {
      items.map(item => this.nivelEstudios.push({name: item.descripcion, code: item.id.toString()}))
    })

    // Llenamos el select de jornadas
    this.empleadosService.getJornadas().subscribe(({data: items}) => {
      items.map(item => this.jornadas.push({name: item.descripcion, code: item.id.toString()}))
    })

    // Llenamos el select de habilidades
    this.empleadosService.getHabilidades().subscribe(({data: items}) => {
      items.map(item => this.habilidadesDisponibles.push({name: item.descripcion, code: item.id.toString()}))
    })

    // Llenamos el select de experiencias
    this.empleadosService.getExperiencias().subscribe(({data: items}) => {
      items.map(item => this.experienciasDisponibles.push({name: item.descripcion, code: item.id.toString()}))
    })
  }

  guardar() {}

}
