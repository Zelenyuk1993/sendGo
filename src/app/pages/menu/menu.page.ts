import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {SessionService} from '../../shared/services/session-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'First Page with Tabs',
      url: '/menu/first'
    },
    {
      title: 'Second Page blank',
      url: '/menu/second'
    }
  ];

  constructor(private router: Router, private sessionService: SessionService ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {}

  logOut() {
    this.sessionService.logout();
  }

}
