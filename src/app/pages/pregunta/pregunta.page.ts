import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/model/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  respuestaUsuario = "";
  correo = "";
  usuario : Usuario;

  constructor(private router: Router,private bd: DataBaseService, private authService: AuthService){
    this.correo = history.state['correo'];
    this.usuario = history.state['usuario'];
  }

  ngOnInit() {
    this.bd.crearUsuariosDePrueba().then(async () => {
      await this.bd.leerUsuarios();
    });
  }

  async redirigir(){
    const response = await this.authService.verificarRespuestaSecreta(this.correo,this.respuestaUsuario);
    if (response) {
      this.router.navigate(['/recuperar-fallido']);
    }
    else {
      this.router.navigate(['/recuperar-exitoso']);
    }

  }

}
