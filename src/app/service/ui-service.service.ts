import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ComponentMenu } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private http : HttpClient) { }

  async alertInfo(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async successToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: 'success'
    });
    toast.present();
  }

  async errorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      color: 'error'
    });
    toast.present();
  }

  //#region Metodo que devuelve la url para llenar el menu
  getMenuOptions() {
    return this.http.get<ComponentMenu[]>('/assets/data/menu.json');
  }
  //#endregion

}
