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
  constructor(private loadingController : LoadingController,
    private route: ActivatedRoute,
      private router: Router) { 
        this.usuario = history.state['usuario'];
      }

  ngOnInit() {
  }

  public validarPregunta(usuario : Usuario): boolean{
    if(usuario.validarRespuesta(usuario.correo, usuario.respuestaSecreta)){
      this.usuario = usuario
      return true
    }
    else{
      return false
    }
  }

  public redirigir(){
    if(this.validarPregunta(this.usuario)){
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      //this.router.navigate(['/recuperarExitoso'], navigationExtras);
    }
  }

}
