import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { EmpleadosService } from '../../services/empleados.service';
import { finalize } from 'rxjs';
import { Requerimiento } from '../../Models/empleados';
import { SUBJECTS, TITLES } from 'src/utils/constants';

@Component({
  selector: 'app-requerimientos',
  templateUrl: './requerimientos.component.html',
  styleUrls: ['./requerimientos.component.scss'],
  providers: [MessageService]
})
export class RequerimientosComponent implements OnInit {

  activatedRoute    = inject(ActivatedRoute)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)
  empleadoService   = inject(EmpleadosService)

  data: Requerimiento[] = []

  constructor() { }

  ngOnInit(): void {
    this.verificarEstado()

    this.sharedService.cambiarEstado(true)

    this.empleadoService.getRequerimientos()
      .pipe(finalize(() => this.sharedService.cambiarEstado(false) ))
      .subscribe({
        next: ({data}) => this.data = data,
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: TITLES.error, detail: SUBJECTS.error })
        }
      })
  }

  verificarEstado() {

    this.activatedRoute.queryParams.subscribe(params => {
      // Access query parameters
      const success = params['success']

      if(success) {
        Promise.resolve().then(() => this.messageService.add({ severity: 'success', summary: 'Requerimiento guardado', detail: 'El requerimiento ha sido guardado.' }))
      }
    });
  }

}
