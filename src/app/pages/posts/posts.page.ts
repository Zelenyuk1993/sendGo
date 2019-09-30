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
  public facebookPostArray: FacebookPostModel[] = [];
  public isLoaded = true;
  constructor( private facebookService: FacebookService) { }

  ngOnInit() {}
  private getFacebookFeedsByAccountId(account: FacebookAccountModel) {
    this.isLoaded = false;
    this.facebookService.getFacebookFeeds(account.id).subscribe(result => {
      if (!this.facebookPostArray.length) {
        this.facebookPostArray = result.map( post => {
         post.accountPictureUrl = account.pictureUrl;
         return FacebookPostModel.fromResponse(post);
        });
        this.isLoaded = true;
      } else  {
        this.facebookPostArray.push(...result.map( post => {
          post.accountPictureUrl = account.pictureUrl;
          return FacebookPostModel.fromResponse(post);
        }));
        this.isLoaded = true;
      }
    });
  }
  changeAccountStatus(account: FacebookAccountModel) {
    if (account.statusSelect) {
      this.getFacebookFeedsByAccountId(account);
    } else  {
      this.facebookPostArray = this.facebookPostArray.filter((obj) => {
        return obj.fromId !== account.id;
      });
    }
  }

  get sortPostArrayByData() {
    return this.facebookPostArray.sort((a: any, b: any) => {
      // @ts-ignore
      return new Date(b.createdTime) - new Date(a.createdTime);
    });
  }
  segmentChanged(event) {
    console.log(event);
  }
}
