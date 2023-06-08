import { Component, OnInit, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { errorsArray } from 'src/utils/constants';

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
  
  empleadosService = inject(EmpleadosService)
  fb = inject(FormBuilder)

  form = this.fb.group({
    categoria:      ['', [Validators.required]],
    puesto:         ['', [Validators.required]],
    nivelEstudios:  ['', [Validators.required]],
    profesion:      ['', [Validators.required]],
    jornada:        ['', [Validators.required]],
    sueldoMin:      ['', [Validators.required]],
    sueldoMax:      ['', [Validators.required]],
    habilidades:    ['', [Validators.required]],
    experiencias:   ['', [Validators.required]],
  })

  
  categorias:     Opcion[] = []
  puestos:        Opcion[] = []
  nivelEstudios:  Opcion[] = []
  jornadas:       Opcion[] = []
  habilidades:    Opcion[] = []
  experiencias:   Opcion[] = []

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
      items.map(item => this.habilidades.push({name: item.descripcion, code: item.id.toString()}))
    })

    // Llenamos el select de experiencias
    this.empleadosService.getExperiencias().subscribe(({data: items}) => {
      items.map(item => this.experiencias.push({name: item.descripcion, code: item.id.toString()}))
    })
  }

  guardar() {
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    console.log(this.form.value)
  }

  esInvalido(campo: string): boolean {
    return this.form.get(campo).invalid && 
            (this.form.get(campo).dirty || this.form.get(campo).touched)
  }

  obtenerMensajeError(campo: string): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(this.form.get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }

}
