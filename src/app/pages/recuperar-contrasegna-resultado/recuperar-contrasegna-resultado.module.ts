import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarContrasegnaResultadoPageRoutingModule } from './recuperar-contrasegna-resultado-routing.module';

import { RecuperarContrasegnaResultadoPage } from './recuperar-contrasegna-resultado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContrasegnaResultadoPageRoutingModule
  ],
  declarations: [RecuperarContrasegnaResultadoPage]
})
export class RecuperarContrasegnaResultadoPageModule {}
