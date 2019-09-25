import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';
import {FacebookLoginResponse} from '@ionic-native/facebook/ngx';

@Injectable()
export class SessionService {
  static readonly STORAGE_SESSION_KEY_FACEBOOK = 'session_facebook';
  public sessionFacebook$ = new ReplaySubject<FacebookLoginResponse>(1);
  public sessionAuthToken: string;

  // public updatedUser$ = new Subject<User>();

  // public user$ = this.session$
  //   .filter(session => session !== null)
  //   .flatMap(() => this.usersService.getUser("me"))
  //   .merge(this.updatedUser$)
  //   .shareReplay(1);
  // public reloadProfile$ = new Subject();

  // public updatedProfile$ = new Subject<Profile>();

  // public profile$ = this.distinctUser$
  //   .merge(this.reloadProfile$.flatMap(() => this.distinctUser$))
  //   .flatMap(user => this.userProfileService.getUserProfile(user.id))
  //   .catch(e => {
  //     if (e.status === 404) {
  //       return this.userProfileService.createUserProfile("me");
  //     }
  //
  //     throw e;
  //   })
  //   .merge(this.updatedProfile$)
  //   .shareReplay(1);

  constructor(
      private storage: StorageMap,
  ) {
    this.storage
      .get(SessionService.STORAGE_SESSION_KEY_FACEBOOK)
      .subscribe( (session: FacebookLoginResponse) => {
        this.sessionAuthToken = session.authResponse.accessToken;
        this.sessionFacebook$.next(session);
      });
  }

  logout() {
    return this.setSession(null);
  }

  public getSessionAuthToken() {
      return  this.sessionAuthToken;
  }

  public setSession(session?: FacebookLoginResponse) {
    if (session === null) {
      this.storage.delete(SessionService.STORAGE_SESSION_KEY_FACEBOOK).subscribe(() => {});
    } else {
      this.storage.set( SessionService.STORAGE_SESSION_KEY_FACEBOOK, session).subscribe(() => {});
    }
    this.sessionFacebook$.next(session);
    // return this.session$.filter(newSession => newSession === session).take(1);
  }
}
