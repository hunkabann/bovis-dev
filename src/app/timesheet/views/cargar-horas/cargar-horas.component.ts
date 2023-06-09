import { Component, OnInit, inject } from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MsalService } from '@azure/msal-angular';
import { SharedService } from 'src/app/shared/services/shared.service';

interface Opcion {
  name: string,
  code: string
}

@Component({
  selector: 'app-cargar-horas',
  templateUrl: './cargar-horas.component.html',
  styleUrls: ['./cargar-horas.component.css']
})
export class CargarHorasComponent implements OnInit {

  errorMessage: string = ''
  cargando: boolean = true

  timesheetService  = inject(TimesheetService)
  authService       = inject(MsalService)
  fb                = inject(FormBuilder)
  sharedService     = inject(SharedService)

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
        dias:       ['', Validators.required],
        dedicacion: ['', Validators.required],
      }),
      this.fb.group({
        id:         ['vacaciones'],
        dias:       ['', Validators.required],
        dedicacion: ['', Validators.required],
      }),
      this.fb.group({
        id:         ['permiso'],
        dias:       ['', Validators.required],
        dedicacion: ['', Validators.required],
      }),
      this.fb.group({
        id:         ['incapacidad'],
        dias:       ['', Validators.required],
        dedicacion: ['', Validators.required],
      }),
      this.fb.group({
        id:         ['inasistencia'],
        dias:       ['', Validators.required],
        dedicacion: ['', Validators.required],
      }),
      this.fb.group({
        id:         ['capacitación'],
        dias:       ['', Validators.required],
        dedicacion: ['', Validators.required],
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

  guardar() {
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    console.log(this.form.value)
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
          dedicacion: ['', Validators.required],
          costo:      ['', Validators.required]
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
        dedicacion: (valor / this.form.value.dias) * 100,
        costo:      (valor / this.form.value.dias) * 100
      })
    } else {
      this.otros.at(i).patchValue({
        dedicacion: (valor / this.form.value.dias) * 100
      })
    }
  }
}

// Feriado
// Vacaciones
// Permiso
// Incapacidad
// Inasistencia
// Capacitación