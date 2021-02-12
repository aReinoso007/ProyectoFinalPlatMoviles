import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestadorServiciosPageRoutingModule } from './prestador-servicios-routing.module';

import { PrestadorServiciosPage } from './prestador-servicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestadorServiciosPageRoutingModule
  ],
  declarations: [PrestadorServiciosPage]
})
export class PrestadorServiciosPageModule {}
