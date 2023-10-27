import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorreoPageRoutingModule } from './correo-routing.module';

import { CorreoPage } from './correo.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorreoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CorreoPage]
})
export class CorreoPageModule { }
