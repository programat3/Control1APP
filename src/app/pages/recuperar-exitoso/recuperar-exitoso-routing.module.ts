import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarExitosoPage } from './recuperar-exitoso.page';

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
export class RecuperarExitosoPageRoutingModule {}
