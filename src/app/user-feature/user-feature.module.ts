import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";

import { UserFeatureRoutingModule } from './user-feature-routing.module';
import * as fromUserMainState from './reducer/index';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserFeatureRoutingModule,
    StoreModule.forFeature(
      fromUserMainState.groupsFeatureKey,
      fromUserMainState.reducers
    ),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserFeatureModule { }
