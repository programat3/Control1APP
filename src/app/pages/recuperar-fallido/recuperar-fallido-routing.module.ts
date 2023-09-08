import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarFallidoPage } from './recuperar-fallido.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarFallidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarFallidoPageRoutingModule {}
