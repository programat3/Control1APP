import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';

import { RecuperarExitosoPage } from './recuperar-exitoso.page';
import { Usuario } from 'src/app/model/Usuario';
import { LoadingController } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: RecuperarExitosoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarExitosoPageRoutingModule {

}
