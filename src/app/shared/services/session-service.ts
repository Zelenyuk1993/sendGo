import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import {FacebookLoginResponse} from '@ionic-native/facebook/ngx';

@Injectable()
export class SessionService {
  static readonly STORAGE_SESSION_KEY_FACEBOOK = 'session_facebook';
  public sessionFacebook$ = new ReplaySubject<FacebookLoginResponse>(1);
  public sessionAuthToken: string;

  constructor(
      private storage: StorageMap,
  ) {
    this.storage
      .get(SessionService.STORAGE_SESSION_KEY_FACEBOOK)
      .subscribe( (session: FacebookLoginResponse) => {
        this.sessionAuthToken = session ? session.authResponse.accessToken : null;
        this.sessionFacebook$.next(session);
      });
  }

  logout() {
    return this.setSession(null);
  }

  public getSessionAuthToken() {
      return this.sessionAuthToken;
  }

  public setSession(session?: FacebookLoginResponse) {
    if (session === null) {
      this.storage.delete(SessionService.STORAGE_SESSION_KEY_FACEBOOK).subscribe(() => {});
    } else {
      this.sessionAuthToken = session.authResponse.accessToken;
      this.storage.set( SessionService.STORAGE_SESSION_KEY_FACEBOOK, session).subscribe(() => {});
    }
    this.sessionFacebook$.next(session);
  }
}
