import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosuPageRoutingModule } from './datosu-routing.module';

import { DatosuPage } from './datosu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosuPageRoutingModule
  ],
  declarations: [DatosuPage]
})
export class DatosuPageModule {}
