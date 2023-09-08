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
  public respuestaSecreta: string;
  constructor(private loadingController : LoadingController,
    private route: ActivatedRoute,
      private router: Router) { 
        this.usuario = history.state['usuario'];
        this.usuario.respuestaSecreta = ''
        this.respuestaSecreta = ''
      }

  ngOnInit() {
  }

  public validarPregunta(usuario: Usuario): boolean{
    const usu = usuario.buscarUsuarioRespuesta(
      usuario.correo, this.respuestaSecreta);
      if (usu) {
        this.usuario = usu
        return true;
      }
      else {
        return false;
      }
  }

  public redirigir(){
    this.usuario.respuestaSecreta = this.respuestaSecreta
    if(this.validarPregunta(this.usuario)){
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      console.log("VALIDO")
      this.router.navigate(['/recuperar-exitoso'], navigationExtras);
    }
    else{
      console.log("INVALIDO");
      this.router.navigate(['/recuperar-fallido']);
    }
  }

}
