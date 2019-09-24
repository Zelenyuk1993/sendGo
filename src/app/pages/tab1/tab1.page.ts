import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../shared/services/session-service';
import {FacebookService} from '../../shared/services/facebook-service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(private sessionService: SessionService, private facebookService: FacebookService) { }

  ngOnInit() {
    this.sessionService.sessionFacebook$.subscribe( session => {
      this.facebookService.getFacebookAccountsPage(session.authResponse.accessToken).subscribe( result => {
        console.log(result);
      });
      console.log(session);
    });
  }

}
