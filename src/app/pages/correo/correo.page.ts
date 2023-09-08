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
  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '');
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  ngOnInit() {
    this.usuario.correo = 'atorres@duocuc.cl';
    this.usuario.password = '1234';
  }

  public ingresar(): void {
    if (!this.validarUsuario(this.usuario)) {
      return;
    }

    this.mostrarMensaje('¡Bienvenid@!');

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/pregunta'], navigationExtras);
  }

  public validarUsuario(usuario: Usuario): boolean {
    const usu = this.usuario.buscarUsuarioValido(
      this.usuario.correo, this.usuario.password);
    if (usu) {
      this.usuario = usu
      return true;
    }
    else {
      this.mostrarMensaje('Credenciales Inválidas')
      return false;
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000
    });
    toast.present();
  }


}

