import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private alertCtrl : AlertController,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private loadCtrl: LoadingController
  ) { }

  /* async alert(message){
    const alert = await this.alertCtrl.create({

      message: message,

    });

    await alert.present()
  }
 */
  async toast(header, position, cor){
    const toast = await this.toastCtrl.create({
      mode: 'ios',
      header: header,
      position: position,
      duration: 2000,
      color: cor
    });

    await toast.present();
  }

  async load(message, duration){
    const load = await this.loadCtrl.create({
      mode:'ios',
      message: message,
      duration: duration
    });

    await load.present();
  }
}
