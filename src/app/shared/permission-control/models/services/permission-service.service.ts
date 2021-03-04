import { Injectable } from '@angular/core';
import { IUserResponse } from 'src/app/user-feature/models/user.model';
import { Features } from '../features.enum';
import { Permission } from '../permission.enum';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  checkPermissionLevel(
    user: IUserResponse,
    feature: Features,
    permission: Permission
  ): boolean {
    const userFeaturePermission = user.featurePermission.find(
      fp => fp.feature === feature
    );

    if (!!userFeaturePermission) {
      switch (permission) {
        case Permission.View:
          return userFeaturePermission.permission == Permission.View;
        case Permission.Admin:
          return userFeaturePermission.permission == Permission.Admin;
        default:
          return userFeaturePermission.permission == Permission.Admin;
      }
    }
    return false;
  }
}
