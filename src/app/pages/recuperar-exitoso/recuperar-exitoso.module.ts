import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarExitosoPageRoutingModule } from './recuperar-exitoso-routing.module';

import { RecuperarExitosoPage } from './recuperar-exitoso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarExitosoPageRoutingModule
  ],
  declarations: [RecuperarExitosoPage]
})
export class RecuperarExitosoPageModule {}
