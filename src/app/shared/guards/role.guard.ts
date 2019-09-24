// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// import { Injectable } from '@angular/core';
// import {SessionService} from '../services/session.service';
// import {Observable} from 'rxjs';
// import {of} from 'rxjs/observable/of';
// import {ProfileStatus} from '../models/profile.model';
// import {UserProfileService} from '../services/user-profile-service';
//
// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private router: Router, private sessionService: SessionService,   private userProfileService: UserProfileService,) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.userProfileService
//       .getUserProfile('me')
//       .take(1)
//       .map(profile => {
//
//         console.log(profile)
//         if (profile.status == ProfileStatus.Pending) {
//           this.router.navigate(['/', 'pending-profile']);
//           return false;
//         } else {
//           return true;
//         }
//       });
//
//   }
// }
