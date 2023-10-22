import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.scss'],
})
export class MisDatosComponent implements OnInit {

  @ViewChild('titulo', { read: ElementRef, static: true }) titulo!: ElementRef;
  public objetoDatosQR;
  public sede: number = 0;
  public idAsignatura: number = 0;
  public seccion: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public dia: string = '';
  public bloqueInicio: string = '';
  public bloqueTermino: string = '';
  public horaInicio: string = '';
  public horaFin: string = '';

  constructor(private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController) {
    this.objetoDatosQR = history.state['data'];
  }

  ngOnInit() { }

}
