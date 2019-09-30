import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable()
export class ToastService {
  constructor(public toastCtrl: ToastController
  ) {}

  showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme',
    }).then((toastData) => {
      toastData.present();
    });
  }
  showToastWithCloseButton(text: string, btnText?: string) {
    this.toastCtrl.create({
          message: text,
          showCloseButton: true,
          cssClass: 'toast-scheme',
          closeButtonText: btnText ? btnText : 'Ok',
          // duration: 2000,
    }).then((toastData) => {
      toastData.present();
    });
  }
}
