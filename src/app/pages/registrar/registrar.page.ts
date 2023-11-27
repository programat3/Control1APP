import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';

  constructor(private auth: AuthService, private bd: DataBaseService, private router: Router) { }

  ngOnInit() {
    //this.auth.usuarioAutenticado.subscribe((usuario) => {
      //this.usuario = usuario ? usuario : new Usuario();
     // this.repeticionPassword = usuario ? usuario.password : '';
   // });
  }
  async crearPerfil() {
    if (this.usuario.password == this.repeticionPassword){
      this.auth.guardarUsuarioAutenticado(this.usuario)
    }
    else{
      alert("Contraseñas no coinciden")
    }
      
  }

  volverLogin() {
    this.router.navigate(['/login'])
  }
}
