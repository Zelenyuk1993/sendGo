import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {HttpClient} from '@angular/common/http';
import {StorageMap} from '@ngx-pwa/local-storage';
import {FacebookService} from '../../shared/services/facebook-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
   user: any = {};
   userdata: string;
   accauntsdata: string;

  constructor(
      private facebook: Facebook,
      private nativeStorage: NativeStorage,
      public loadingController: LoadingController,
      private navCtrl: NavController,
      private http: HttpClient,
      private facebookService: FacebookService,
      public alertController: AlertController) { }

  ngOnInit() {}

     loginFb() {
      this.facebookService.facebookLogin().subscribe((connected) => {

          console.log(connected)
          if (connected === true) {
              this.navCtrl.navigateRoot('/menu/first');

              // this.facebookService.getFacebookProfile().subscribe((profile) => {
              //     console.log(profile);
              //     }, (error) => {
              //     console.log(error);
              // });
          }
      }, (error) => {
          console.log(error);
      } );

         // this.storage.get('user').subscribe((user) => {
         //     console.log(user);
         // });
        // this.fb.login(['public_profile', 'email'])
        //     .then((res: FacebookLoginResponse) => {
        //         if ( res.status === 'connected') {
        //             this.user.img = 'http://graph.facebook.com/' + res.authResponse.userID + '/picture?type=square';
        //             this.getData(res.authResponse.accessToken);
        //             this.getMyAccountsPage(res.authResponse.accessToken);
        //         } else {
        //             alert('Login filed');
        //         }
        //         console.log('Logged into Facebook!', res);
        //         }
        //     )
        //     .catch(e => console.log('Error logging into Facebook', e));
    }




    getFacebookProfile( accessToken: string) {
                this.facebookService.getFacebookProfile(accessToken).subscribe( data => {
                    console.log(data);
                });
    }

    getFacebookAccountsPage( accessToken: string) {
                this.facebookService.getFacebookAccountsPage(accessToken).subscribe( data => {
                    console.log(data);
                });
    }
    // getData( accessToken: string) {
    //   const url = 'https://graph.facebook.com/me/?fields=id,first_name,last_name,email&access_token=' + accessToken;
    //   this.http.get(url).subscribe(data => {
    //       this.userdata = JSON.stringify(data);
    //       console.log(data);
    //       }
    //   );
    // }

    getMyAccountsPage(accessToken: string) {
        const url = 'https://graph.facebook.com/me/accounts?fields=id,name,access_token,page_token,about,bio,picture{url}&access_token=' + accessToken;
        this.http.get(url).subscribe(data => {
                this.accauntsdata = JSON.stringify(data);
                console.log(data);
            }
        );
    }
}
