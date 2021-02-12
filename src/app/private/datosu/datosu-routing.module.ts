import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosuPage } from './datosu.page';

const routes: Routes = [
  {
    path: '',
    component: DatosuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosuPageRoutingModule {}
