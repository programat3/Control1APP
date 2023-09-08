import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarFallidoPageRoutingModule } from './recuperar-fallido-routing.module';

import { RecuperarFallidoPage } from './recuperar-fallido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarFallidoPageRoutingModule
  ],
  declarations: [RecuperarFallidoPage]
})
export class RecuperarFallidoPageModule {}
