import { Component, OnInit, inject } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MsalService } from '@azure/msal-angular';
import { SharedService } from 'src/app/shared/services/shared.service';
import { errorsArray } from 'src/utils/constants';
import { MessageService } from 'primeng/api';

interface Opcion {
  name: string,
  code: string
}

@Component({
  selector: 'app-cargar-horas',
  templateUrl: './cargar-horas.component.html',
  styleUrls: ['./cargar-horas.component.css'],
  providers: [MessageService]
})
export class CargarHorasComponent implements OnInit {

  errorMessage: string = ''
  cargando: boolean = true

  timesheetService  = inject(TimesheetService)
  authService       = inject(MsalService)
  fb                = inject(FormBuilder)
  sharedService     = inject(SharedService)
  messageService    = inject(MessageService)

  empleados: Opcion[] = []

  diasHabiles: number = 0

  form = this.fb.group({
    empleado:     ['', [Validators.required]],
    fecha:        [format(Date.now(), 'M/Y')],
    mes:          [format(Date.now(), 'M')],
    anio:         [format(Date.now(), 'Y')],
    responsable:  [localStorage.getItem('userMail')],
    dias:         [this.diasHabiles, [Validators.min(1)]],
    sabados:      ['NO'],
    proyectos:    this.fb.array([]),
    otros:        this.fb.array([
      this.fb.group({
        id:         ['feriado'],
        dias:       [0, Validators.required],
        dedicacion: [0],
      }),
      this.fb.group({
        id:         ['vacaciones'],
        dias:       [0, Validators.required],
        dedicacion: [0],
      }),
      this.fb.group({
        id:         ['permiso'],
        dias:       [0, Validators.required],
        dedicacion: [0],
      }),
      this.fb.group({
        id:         ['incapacidad'],
        dias:       [0, Validators.required],
        dedicacion: [0],
      }),
      this.fb.group({
        id:         ['inasistencia'],
        dias:       [0, Validators.required],
        dedicacion: [0],
      }),
      this.fb.group({
        id:         ['capacitación'],
        dias:       [0, Validators.required],
        dedicacion: [0],
      })
    ])
  })

  constructor() { }

  get proyectos() {
    return this.form.get('proyectos') as FormArray
  }

  get otros() {
    return this.form.get('otros') as FormArray
  }

  get totalSuperado(): boolean {
    return (this.diasAcumulados > this.form.value.dias)
  }

  get totalNoAlcanzado(): boolean{
    return (this.diasAcumulados < this.form.value.dias)
  }

  get diasAcumulados() {
    let totalProyectos = 0
    let totalOtros = 0
    for (let i = 0; i < this.proyectos.value.length; i++) {
      totalProyectos += +this.proyectos.value[i].dias
    }

    for (let i = 0; i < this.otros.value.length; i++) {
      totalOtros += +this.otros.value[i].dias
    }

    return (totalProyectos + totalOtros)
  }

  ngOnInit(): void {
    
    this.sharedService.cambiarEstado(true)

    this.timesheetService.getEmpleados().subscribe(({data: items}) => {
      items.map(item => this.empleados.push({name: item.nombre_persona, code: item.nunum_empleado_rr_hh.toString()}))
    })

    this.timesheetService.getDiasHabiles(
      +this.form.value.mes, 
      +this.form.value.anio, 
      this.form.value.sabados as any
    ).subscribe(({habiles, feriados}) => {
      this.form.patchValue({dias: habiles})
      this.otros.at(0).patchValue({dias: feriados})
      this.sharedService.cambiarEstado(false)
    })
  }

  buscarProyectos(event: any) {
    this.sharedService.cambiarEstado(true)
    const id = event.value.code
    this.timesheetService.getProyectos(id).subscribe(({data}) => {
      this.proyectos.clear()
      data.map(proyecto => this.proyectos.push(
        this.fb.group({
          id:         [proyecto.nunum_proyecto],
          nombre:     [proyecto.chproyecto],
          dias:       ['', Validators.required],
          dedicacion: [0],
          costo:      [0]
        }))
      )
      this.sharedService.cambiarEstado(false)
    })
  }

  calcularDias(event: any) {
    this.sharedService.cambiarEstado(true)
    
    this.timesheetService.getDiasHabiles(
      +this.form.value.mes, 
      +this.form.value.anio, 
      event.value as any
    ).subscribe(({habiles, feriados}) => {
      this.form.patchValue({dias: habiles})
      this.otros.at(0).patchValue({dias: feriados})
      this.sharedService.cambiarEstado(false)
    })
  }

  calcularPorcentajes(event: any, i: number, seccion: string) {
    const valor = +event
    if(seccion === 'proyectos') {
      this.proyectos.at(i).patchValue({
        dedicacion: Math.round((valor / this.form.value.dias) * 100),
        costo:      Math.round((valor / this.form.value.dias) * 100)
      })
    } else {
      this.otros.at(i).patchValue({
        dedicacion: Math.round((valor / this.form.value.dias) * 100)
      })
    }
  }

  guardar() {
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    const body = {...this.form.value, sabados: (this.form.value.sabados === 'SI'), id_responsable: 1} 

    // console.log(body)
    // return

    this.sharedService.cambiarEstado(true)

    this.timesheetService.cargarHoras(body)
      .subscribe({
        next: (data) => {
          console.log(data)
          // this.form.reset()
          this.sharedService.cambiarEstado(false)
          this.messageService.add({ severity: 'success', summary: 'Horas cargadas', detail: 'Las horas han sido cargadas.' })
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

  esInvalidoEnArreglo(formArray: FormArray, campo: string, index: number): boolean {
    return formArray.controls[index].get(campo).invalid && 
            (formArray.controls[index].get(campo).dirty || formArray.controls[index].get(campo).touched)
  }

  obtenerMensajeErrorEnArreglo(formArray: FormArray, campo: string, index: number): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(formArray.controls[index].get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }
}