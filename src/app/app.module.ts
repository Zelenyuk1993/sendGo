import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';
import { StorageModule } from '@ngx-pwa/local-storage';
import {SessionService} from './shared/services/session-service';
import {FacebookService} from './shared/services/facebook-service';
import {AuthGuard} from './shared/guards/auth.guard';
import {ToastAndAlertService} from './shared/services/toast-alert.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StorageModule.forRoot({ IDBNoWrap: true })],
  providers: [
    Facebook,
    StatusBar,
    NativeStorage,
    SplashScreen,
    SessionService,
    FacebookService,
    AuthGuard,
    ToastAndAlertService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
