import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable()
export class ToastAndAlertService {
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public loadingController: LoadingController
  ) {}

  async showToast(text: string) {
   const toastData = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      cssClass: 'toast-scheme',
    });
   await toastData.present();
  }
 async  showToastWithCloseButton(text: string, btnText?: string) {
   const toastData = await this.toastCtrl.create({
          message: text,
          showCloseButton: true,
          cssClass: 'toast-scheme',
          closeButtonText: btnText ? btnText : 'Ok',
          // duration: 2000,
    });
   await toastData.present();
  };

  async presentAlert(title: string, messageText: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      // subHeader: 'Subtitle',
      message: messageText,
      buttons: ['OK']
    });

    await alert.present();
  }


    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();

        console.log('Loading dismissed!');
    }

    async dismissLoading() {
    this.loadingController.dismiss();
    }
}
