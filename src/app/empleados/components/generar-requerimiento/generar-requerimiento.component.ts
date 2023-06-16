import { Component, OnInit, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormBuilder, Validators } from '@angular/forms';
import { errorsArray } from 'src/utils/constants';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MessageService } from 'primeng/api';
import { finalize, forkJoin, map as mapRxjs, map } from 'rxjs';
import { Router } from '@angular/router';

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
  styleUrls: ['./generar-requerimiento.component.css'],
  providers: [MessageService]
})
export class GenerarRequerimientoComponent implements OnInit {
  
  empleadosService  = inject(EmpleadosService)
  fb                = inject(FormBuilder)
  sharedService     = inject(SharedService)
  messageService    = inject(MessageService)
  router            = inject(Router)

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
  profesiones:    Opcion[] = []

  constructor() { }

  ngOnInit(): void {

    this.sharedService.cambiarEstado(true)

    forkJoin([
      this.empleadosService.getCategorias(),
      this.empleadosService.getPuestos(),
      this.empleadosService.getNivelEstudios(),
      this.empleadosService.getJornadas(),
      this.empleadosService.getHabilidades(),
      this.empleadosService.getExperiencias(),
      this.empleadosService.getProfesiones()
    ])
    .pipe(
      finalize(() => {
        this.sharedService.cambiarEstado(false)
      })
    )
    .subscribe(([categoriasR, puestosR, nivelesR, jornadasR, habilidadesR, experienciasR, profesionesR]) => {
      this.categorias = categoriasR.data.map(categoria => ({name: categoria.descripcion, code: categoria.id.toString()}))
      this.puestos = puestosR.data.map(puesto => ({name: puesto.descripcion, code: puesto.id.toString()}))
      this.nivelEstudios = nivelesR.data.map(nivel => ({name: nivel.descripcion, code: nivel.id.toString()}))
      this.jornadas = jornadasR.data.map(jornada => ({name: jornada.descripcion, code: jornada.id.toString()}))
      this.habilidades = habilidadesR.data.map(habilidad => ({name: habilidad.descripcion, code: habilidad.id.toString()}))
      this.experiencias = experienciasR.data.map(experiencia => ({name: experiencia.descripcion, code: experiencia.id.toString()}))
      this.profesiones = profesionesR.data.map(profesion => ({name: profesion.descripcion, code: profesion.id.toString()}))
    })
  }

  guardar() {
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    this.sharedService.cambiarEstado(true)

    this.empleadosService.generarRequerimiento(this.form.value)
      .subscribe({
        next: (data) => {
          console.log(data)
          this.form.reset()
          this.sharedService.cambiarEstado(false)
          this.router.navigate(['/empleados/requerimientos'], {queryParams: {success: true}});
        },
        error: (err) => {
          this.sharedService.cambiarEstado(false)
          this.messageService.add({ severity: 'error', summary: 'Oh no...', detail: '¡Ha ocurrido un error!' })
        }
      })
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
