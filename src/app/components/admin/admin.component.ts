import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC } from 'src/app/tools/message-routines';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AdminComponent implements OnInit {
  public usuarios: any = [];
  constructor(private auth: AuthService, private bd: DataBaseService, private router: Router) {
  }

  ngOnInit() {
    this.getUsuarios();
  }
  async getUsuarios() {
    this.usuarios = await this.bd.leerUsuariosAdmin();
  }

  public eliminarUsuario(usu: any) {
    if(usu == 'admin@duocuc.cl'){
      showAlertDUOC("No se puede borrar al admin");
      return;
    }
    else{
      this.bd.eliminarUsuarioUsandoCorreo(usu);
      showAlertDUOC("Se eliminó");

    }
    
  }

}
