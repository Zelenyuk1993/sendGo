import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../../shared/services/facebook-service';
import {FacebookAccountModel} from '../../shared/models/facebook-account.model';
import {FacebookPostModel} from '../../shared/models/facebook-post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  public selectedSegment  = 'past-posts';
  public facebookAccountArray: FacebookAccountModel[] = [];
  public facebookPostArray: FacebookPostModel[] = [];

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
  private getFacebookFeedsByAccountId(accountId: number) {
    this.facebookService.getFacebookFeeds(accountId).subscribe(result => {
      if (!this.facebookPostArray.length) {
        this.facebookPostArray = result.map( post => FacebookPostModel.fromResponse(post));
        console.log( this.facebookPostArray );
      } else  {
        this.facebookPostArray.push(...result.map( post => FacebookPostModel.fromResponse(post)));
      }
    });
  }

  changeAccountStatus(account: FacebookAccountModel) {
    account.statusSelect = !account.statusSelect;
    if (account.statusSelect) {
      this.getFacebookFeedsByAccountId(account.id);
    } else  {
      this.facebookPostArray = this.facebookPostArray.filter((obj) => {
        return obj.fromId !== account.id;
      });
    }
  }

  segmentChanged(event) {
    console.log(event);
  }
}
