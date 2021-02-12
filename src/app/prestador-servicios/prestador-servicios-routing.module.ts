import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestadorServiciosPage } from './prestador-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: PrestadorServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestadorServiciosPageRoutingModule {}
