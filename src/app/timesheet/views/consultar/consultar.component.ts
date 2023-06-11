import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  providers: [MessageService]
})
export class ConsultarComponent implements AfterViewInit {

  activatedRoute = inject(ActivatedRoute)
  messageService = inject(MessageService)

  constructor() { }

  ngAfterViewInit(): void {
    this.verificarEstado()
  }

  verificarEstado() {

    this.activatedRoute.queryParams.subscribe(params => {
      // Access query parameters
      const success = params['success']

      if(success) {
        Promise.resolve().then(() => this.messageService.add({ severity: 'success', summary: 'Horas cargadas', detail: 'Las horas han sido cargadas.' }))
      }
    });
  }

}
