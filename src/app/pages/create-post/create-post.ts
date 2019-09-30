import { Component, OnInit } from '@angular/core';
import {FacebookService} from '../../shared/services/facebook-service';
import {FacebookAccountModel} from '../../shared/models/facebook-account.model';
import {FacebookPostModel} from '../../shared/models/facebook-post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.html',
  styleUrls: ['./create-post.scss'],
})
export class CreatePost implements OnInit {
  public isLoaded = true;

  public test;

  constructor( private facebookService: FacebookService) { }

  ngOnInit() {}

  changeAccountStatus(account: FacebookAccountModel) {

  }

}
