import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {SessionService} from './session-service';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
declare var FB: any;

@Injectable()
export class FacebookService {
  session: FacebookLoginResponse;
  static readonly APP_KEY = '2295688167225162';

  constructor(
      private httpClient: HttpClient,
      public platform: Platform,
      private facebook: Facebook,
      private sessionService: SessionService,
  ) {

    (window as any).fbAsyncInit = response => {
      FB.init({
        appId      : FacebookService.APP_KEY,
        cookie     : true,
        xfbml      : true,
        version    : 'v4.0'
      });
      FB.AppEvents.logPageView();
    };

    (((d, s, id) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk'));
 }

  // public facebookLogin() {
  //   return new Observable(observer => {
  //     this.facebook.login(['email']).then((response: FacebookLoginResponse) => {
  //       if (response.status === 'connected') {
  //         this.session = response;
  //         this.sessionService.setSession(response);
  //         observer.next(true);
  //         observer.complete();
  //       } else {
  //         observer.next(false);
  //         observer.complete();
  //       }
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   });
  // }

  public facebookLogin() {
    return new Observable(observer => {
      FB.login((response: FacebookLoginResponse) => {
        if (response.status === 'connected') {
          this.session = response;
          this.sessionService.setSession(response);
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

  public getFacebookProfile(accessToken: string): Observable<any> {
    const url = `https://graph.facebook.com/me/?fields=id,first_name,last_name,email,picture{url}&access_token=${accessToken}`;
    return this.httpClient.get(url).pipe(map(response => {
      return response;
    }));
  }

  public getFacebookAccountsPage(accessToken: string): Observable<any> {
      const url = `https://graph.facebook.com/me/accounts?fields=id,name,access_token,page_token,about,bio,picture{url}&access_token=${accessToken}`;
      return this.httpClient.get(url).pipe(map( (response: {data: Array<any>, paging: any})  => {
      return response.data;
    }));
  }
}
