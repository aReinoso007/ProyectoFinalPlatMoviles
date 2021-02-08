import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DireccionesPageRoutingModule } from './direcciones-routing.module';

import { DireccionesPage } from './direcciones.page';
import { AgmCoreModule } from '@agm/core';

//c98ee318-8238-429c-aa21-d0cc02f7e9ea
//AIzaSyCrTJjf1ciS5DS5feqEWFX1pntGc7MFJi4
//AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DireccionesPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCT9wzsIIAkW95uHWVvCbBEP-xtjNbJPow'
    })
  ],
  declarations: [DireccionesPage]
})
export class DireccionesPageModule {}
