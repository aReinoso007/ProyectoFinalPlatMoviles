import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionesPageRoutingModule } from './direcciones-routing.module';

import { DireccionesPage } from './direcciones.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionesPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyD2IuLlso6V8K1LrYcDTKZeCfwPi6EMhfE'
    })
  ],
  declarations: [DireccionesPage]
})
export class DireccionesPageModule {}
