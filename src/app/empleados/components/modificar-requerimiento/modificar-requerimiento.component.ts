import { Component, OnInit, inject } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Opcion } from 'src/models/general.model';
import { finalize, forkJoin } from 'rxjs';
import { SUBJECTS, TITLES, errorsArray } from 'src/utils/constants';

@Component({
  selector: 'app-modificar-requerimiento',
  templateUrl: './modificar-requerimiento.component.html',
  styleUrls: ['./modificar-requerimiento.component.scss']
})
export class ModificarRequerimientoComponent implements OnInit {
  
  empleadosService  = inject(EmpleadosService)
  fb                = inject(FormBuilder)
  sharedService     = inject(SharedService)
  messageService    = inject(MessageService)
  router            = inject(Router)
  activatedRoute    = inject(ActivatedRoute)

  constructor() { }

  form = this.fb.group({
    id_requerimiento: [0],
    categoria:        ['', [Validators.required]],
    puesto:           ['', [Validators.required]],
    nivelEstudios:    ['', [Validators.required]],
    profesion:        ['', [Validators.required]],
    jornada:          ['', [Validators.required]],
    sueldoMin:        ['', [Validators.required]],
    sueldoMax:        ['', [Validators.required]],
    habilidades:      [[''], [Validators.required]],
    experiencias:     [[''], [Validators.required]],
  })
  
  categorias:     Opcion[] = []
  puestos:        Opcion[] = []
  nivelEstudios:  Opcion[] = []
  jornadas:       Opcion[] = []
  habilidades:    Opcion[] = []
  experiencias:   Opcion[] = []
  profesiones:    Opcion[] = []

  ngOnInit(): void {

    this.sharedService.cambiarEstado(true)

    this.activatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      this.form.patchValue({id_requerimiento: id})

      this.empleadosService.getRequerimiento(id)
        .subscribe({
          next: ({data}) => {
            const requerimiento = data
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

              const habilidades = requerimiento.habilidades.map(habilidad => habilidad.idHabilidad.toString())
              const experiencias = requerimiento.experiencias.map(experiencia => experiencia.idExperiencia.toString())

              this.form.patchValue({
                sueldoMin:      requerimiento.nusueldo_min.toString(),
                sueldoMax:      requerimiento.nusueldo_max.toString(),
                categoria:      requerimiento.nukidcategoria.toString(),
                puesto:         requerimiento.nukidpuesto.toString(),
                nivelEstudios:  requerimiento.nukidnivel_estudios.toString(),
                profesion:      requerimiento.nukidprofesion.toString(),
                jornada:        requerimiento.nukidjornada.toString(),
                habilidades,
                experiencias
              })
            })
          },
          error: (err) => {
            this.sharedService.cambiarEstado(false)
            this.messageService.add({ severity: 'error', summary: TITLES.error, detail: SUBJECTS.error })
          }
        })
    })
  }

  guardar() {
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    this.sharedService.cambiarEstado(true)

    this.empleadosService.actualizarRequerimiento(this.form.value)
      .subscribe({
        next: (data) => {
          this.form.reset()
          this.sharedService.cambiarEstado(false)
          this.router.navigate(['/empleados/requerimientos'], {queryParams: {success: true}});
        },
        error: (err) => {
          this.sharedService.cambiarEstado(false)
          this.messageService.add({ severity: 'error', summary: TITLES.error, detail: SUBJECTS.error })
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
