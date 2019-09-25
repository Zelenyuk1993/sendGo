import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {SessionService} from '../../shared/services/session-service';
import {FacebookService} from '../../shared/services/facebook-service';
import {UserModel} from '../../shared/models/user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage  {
  public selectedPath = '';
  public pages = [
    {
      title: 'Facebook Posts',
      url: '/menu/posts',
      icon: 'paper'

    }
  ];

  public user$: Observable<UserModel> = this.facebookService.getFacebookProfile();

  constructor(private router: Router, private sessionService: SessionService, private facebookService: FacebookService ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  logOut() {
    this.sessionService.logout();
  }

}
