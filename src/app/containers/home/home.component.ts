import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Features } from 'src/app/shared/permission-control/models/features.enum';
import { Permission } from 'src/app/shared/permission-control/models/permission.enum';
import { IUserResponse } from 'src/app/user-feature/models/user.model';

import * as userSelector from '../../user-feature/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  name: string;
  permission: Permission;
  feature: Features;
  subscription: Subscription = new Subscription();
  constructor(private store: Store<any>) {
    this.name = 'null';
    this.permission = Permission.Admin;
    this.feature = Features.All;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(userSelector.selectUser).subscribe(user => {
        this.name = user.name;
        this.permission = user.featurePermission[0].permission
        this.feature = user.featurePermission[0].feature
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
