import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  public usuario : Usuario;
  public respuestaUsuario: string;
  constructor(private loadingController : LoadingController,
    private route: ActivatedRoute,
      private router: Router) { 
        this.usuario = history.state['usuario'];
        this.respuestaUsuario = ''
      }

  ngOnInit() {
  }

  public redirigir(): void {
    if (!this.validarUsuarioRespuesta(this.usuario)) {
      this.router.navigate(['/recuperar-fallido']);
    }

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/recuperar-exitoso'], navigationExtras);
  }

  public validarUsuarioRespuesta(usuario: Usuario): boolean {
    if(this.usuario.respuestaSecreta === this.respuestaUsuario){
      this.usuario.respuestaSecreta = this.respuestaUsuario
      return true
    }
    else{
      return false
    }
  }

}
