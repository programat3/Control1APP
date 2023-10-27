import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router'
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  correo = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router, private toastController: ToastController) {
  }

  ngOnInit() {
  }

  public preguntar() {
    const correo = this.correo.value;
    this.authSvc.verificarRespuestaSecreta;
    console.log('Funciona el botón')
    this.router.navigate(['/recuperar-exitoso'])
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }


}

