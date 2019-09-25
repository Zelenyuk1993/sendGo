import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

import {FacebookService} from '../../shared/services/facebook-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  constructor(
      private navCtrl: NavController,
      private facebookService: FacebookService) { }

  ngOnInit() {}

     loginFb() {
          this.facebookService.facebookLogin().subscribe((connected) => {
              if (connected === true) {
                  this.navCtrl.navigateRoot('/menu/posts');
              }
          }, (error) => {
              console.log(error);
          } );
    }
}
