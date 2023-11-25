import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo = "atorres@duocuc.cl";
  password = "1234";
  constructor(private bd: DataBaseService, private router: Router, private authService: AuthService) {
  }

  async ngOnInit() {
    this.bd.crearUsuariosDePrueba().then(async () => {
      await this.bd.leerUsuarios();
    });
  }

  public ingresar(): void {
    this.authService.login(
      this.correo, this.password)
  }

  volverLogin() {
    this.router.navigate(['/login'])
  }




}
