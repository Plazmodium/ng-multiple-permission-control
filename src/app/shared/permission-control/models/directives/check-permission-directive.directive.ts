import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { select, State, Store } from '@ngrx/store';
import { Features } from '../features.enum';
import { Permission } from '../permission.enum';
import * as userSelector from '../../../../user-feature/selectors/';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PermissionService } from '../services/permission-service.service';

@Directive({
  selector: '[appCheckPermissions]'
})
export class CheckPermissionDirective implements OnInit, OnDestroy {
  // @Input() appCheckPermissions: Permission;
  // @Input() appCheckFeature: Features;
  @Input() appCheckPermissions?: string;
  @Input() appCheckPermissionsFeature?: string;

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private store: Store<any>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {
    // this.appCheckPermissions = Permission.Admin;

  }

  ngOnInit() {
    this.store
      .pipe(
        select(userSelector.selectUser),
        takeUntil(this.onDestroy$)
      )
      .subscribe(user => {
        console.log('feature CheckPermissionDirective:', this.appCheckPermissions);
        console.log('permission CheckPermissionDirective:', this.appCheckPermissionsFeature);

        // if (user.featurePermission[0].feature === Features.All) {
        //   console.log('1', user.featurePermission[0].feature)
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // } else if (user.featurePermission[0].feature === Features.Section1) {
        //   console.log('2', user.featurePermission[0].feature)
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // } else if (user.featurePermission[0].feature === Features.Section2) {
        //   console.log('3', user.featurePermission[0].feature)
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // } else {
        //   this.viewContainer.clear();
        // }

        // if (this.appCheckPermissions === 'admin') {
        //   console.log('object')
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // } else if (this.appCheckPermissions === 'user1') {
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // } else if (this.appCheckPermissions === 'user2') {
        //   this.viewContainer.createEmbeddedView(this.templateRef);
        // }else{
        //   this.viewContainer.clear();
        // }

        if (
          !!user &&
          this.permissionService.checkPermissionLevel(
            user,
            this.appCheckPermissions,
            this.appCheckPermissionsFeature
          )
        ) {
          console.log('here 1', this.templateRef)
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          console.log('here 2')
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
