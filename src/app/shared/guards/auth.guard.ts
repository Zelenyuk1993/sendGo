import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {SessionService} from '../services/session-service';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.sessionService
      .sessionFacebook$
        .pipe(
            take(1),
            map((session) => {
               if (!session) {
                this.router.navigate(['/', 'login']);
                return false;
            } else {
                return true;
            }
        }));

  }
}
