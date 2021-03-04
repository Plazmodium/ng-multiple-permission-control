import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CheckPermissionDirectiveDirective } from './shared/permission-control/models/directives/check-permission-directive.directive';
import { LoginComponent } from './containers/login/login.component';
import { HomeComponent } from './containers/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './shared/services/login-service.service';
import {UserFeatureModule} from "../app/user-feature/user-feature.module"

@NgModule({
  declarations: [
    AppComponent,
    CheckPermissionDirectiveDirective,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    UserFeatureModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
