import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {SharedModule} from '../../shared/shared.module';
import {CreatePost} from './create-post';

const routes: Routes = [
  {
    path: '',
    component: CreatePost
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule

  ],
  declarations: [CreatePost]})
export class CreatePostModule {}
