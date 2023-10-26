import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { Router } from '@angular/router';
import { DataBaseService } from './data-base.service';
import { Storage } from '@ionic/storage-angular';
import { showToast } from '../tools/message-routines';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);
  primerInicioSesion = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) {
    this.inicializarAutenticacion();
  }

  async inicializarAutenticacion() {
    await this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario) as Usuario;
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  guardarUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  eliminarUsuarioAutenticado(usuario: Usuario) {
    this.storage.remove(this.keyUsuario);
  }

  async login(correo: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.primerInicioSesion.next(false);
        this.router.navigate(['home']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido ${usuario.nombre}!`);
            this.guardarUsuarioAutenticado(usuario);
            this.primerInicioSesion.next(true);
            this.router.navigate(['home']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['login']);
          }
        })
      }
    })
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre}!`);
        this.eliminarUsuarioAutenticado(usuario);
      }
      this.router.navigate(['ingreso']);
    });
  }

  async verificarRespuestaSecreta(correo: string, respuesta: string): Promise<boolean> {
    const usuario = await this.bd.leerUsuario(correo);
    if (usuario && usuario.respuestaSecreta === respuesta) {
      return true; // Respuesta correcta
    }
    return false; // Respuesta incorrecta
  }
}
