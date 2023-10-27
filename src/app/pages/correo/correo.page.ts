import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {
  correo = "";
  password = '';
  constructor(private router: Router, private toastController: ToastController, private bd: DataBaseService, private authService: AuthService) {
    this.correo = '';
    this.password = '';
  }

  ngOnInit() {
    this.bd.crearUsuariosDePrueba().then(async () => {
      await this.bd.leerUsuarios();
    });
  }

  async preguntar() {
    const usu = await this.bd.leerUsuario(this.correo);
    if (usu){
      const navigationExtras: NavigationExtras = {
        state: {
          correo: this.correo,
          usuario: usu
        }
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    }
    else{
      this.router.navigate(['/recuperar-fallido']);
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

