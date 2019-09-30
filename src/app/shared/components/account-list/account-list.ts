import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FacebookAccountModel} from '../../models/facebook-account.model';
import {FacebookService} from '../../services/facebook-service';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.html',
  styleUrls: ['./account-list.scss'],
})
export class AccountList implements OnInit {
  public facebookAccountArray: FacebookAccountModel[] = [];
  public isLoaded = false;
  @Output() changeAccountStatusEmit = new EventEmitter<FacebookAccountModel>();

  constructor( private facebookService: FacebookService) { }

  ngOnInit() {
    this.getFacebookAccountsPage();
  }

  private getFacebookAccountsPage() {
    this.facebookService.getFacebookAccountsPage().subscribe(result => {
      this.facebookAccountArray = result.map( account => FacebookAccountModel.fromResponse(account));
      this.isLoaded = true;
      console.log( this.facebookAccountArray );
    });
  }
  changeAccountStatus(account: FacebookAccountModel) {
    account.statusSelect = !account.statusSelect;
    this.changeAccountStatusEmit.emit(account);
  }
}
