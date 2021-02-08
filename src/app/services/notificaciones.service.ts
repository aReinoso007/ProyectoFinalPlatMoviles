import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(public toastController: ToastController,
    public alertController: AlertController) { }


  async notificacionToast(text: string){
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  async confirmacion(header: string, message: string, funcion?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            funcion();
          }
        }
      ]
    });

    await alert.present();
  }
}
