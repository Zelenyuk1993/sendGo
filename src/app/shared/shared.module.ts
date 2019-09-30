import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountList} from './components/account-list/account-list';
import {IonicModule} from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],

  declarations: [
    AccountList
  ],
  exports: [
    AccountList

  ]
})
export class SharedModule {}
