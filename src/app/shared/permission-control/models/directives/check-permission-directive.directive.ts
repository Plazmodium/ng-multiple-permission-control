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
  selector: '[appCheckPermissionDirective]'
})
export class CheckPermissionDirectiveDirective implements OnInit, OnDestroy {
  @Input() appCheckPermissions: Permission;
  @Input() appCheckPermissionsFeature: Features;
  private onDestroy$ = new Subject<boolean>();

  constructor(
    private store: Store<any>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {
    this.appCheckPermissions = Permission.Admin;
    this.appCheckPermissionsFeature = Features.All;
  }

  ngOnInit() {
    this.store
      .pipe(
        select(userSelector.selectUser),
        takeUntil(this.onDestroy$)
      )
      .subscribe(user => {
        if (
          !!user &&
          this.permissionService.checkPermissionLevel(
            user,
            this.appCheckPermissionsFeature,
            this.appCheckPermissions
          )
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
