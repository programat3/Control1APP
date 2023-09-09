import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

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
    this.objetoDatosQR = history.state['datos'];
  }

  ngOnInit() {
    this.sede = this.objetoDatosQR.sede;
    this.idAsignatura = this.objetoDatosQR.idAsignatura;
    this.seccion = this.objetoDatosQR.seccion;
    this.nombreAsignatura = this.objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = this.objetoDatosQR.nombreProfesor;
    this.dia = this.objetoDatosQR.dia;
    this.bloqueInicio = this.objetoDatosQR.bloqueInicio;
    this.bloqueTermino = this.objetoDatosQR.bloqueTermino;
    this.horaInicio = this.objetoDatosQR.horaInicio;
    this.horaFin = this.objetoDatosQR.horaFin;
  }

}
