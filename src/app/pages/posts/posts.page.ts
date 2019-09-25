import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../../shared/services/facebook-service';
import {FacebookAccountModel} from '../../shared/models/facebook-account.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  public facebookAccountArray: FacebookAccountModel[] = [];

  constructor( private facebookService: FacebookService) { }

  ngOnInit() {
    this.getFacebookAccountsPage();
  }

  private getFacebookAccountsPage() {
    this.facebookService.getFacebookAccountsPage().subscribe(result => {
      this.facebookAccountArray = result.map( account => FacebookAccountModel.fromResponse(account));
      console.log( this.facebookAccountArray );
    });
  }
}
