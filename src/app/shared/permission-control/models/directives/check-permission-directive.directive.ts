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
  @Input() appCheckPermissions?: string;
  @Input() appCheckPermissionsFeature?: string;

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private store: Store<any>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.store
      .pipe(
        select(userSelector.selectUser),
        takeUntil(this.onDestroy$)
      )
      .subscribe(user => {
        console.log('feature CheckPermissionDirective:', this.appCheckPermissions);
        console.log('permission CheckPermissionDirective:', this.appCheckPermissionsFeature);

        if (
          !!user &&
          this.permissionService.checkPermissionLevel(
            user,
            this.appCheckPermissions,
            this.appCheckPermissionsFeature
          )
        ) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          console.log('view container cleared')
          this.viewContainer.clear();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.unsubscribe();
  }
}
