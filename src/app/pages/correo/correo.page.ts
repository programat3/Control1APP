import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  correo = "atorres@duocuc.cl";
  password = '';
  constructor(private router: Router, private toastController: ToastController) {
    this.correo = '';
    this.password = '';
  }

  ngOnInit() {
  }

  public preguntar(): void {
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }


}

