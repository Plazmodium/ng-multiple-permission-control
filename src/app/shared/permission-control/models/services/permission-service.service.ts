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
    feature?: string,
    permission?: string
  ): boolean {
    
    const userFeaturePermission = user.featurePermission.find(
      fp => {
        return fp.permission === feature
      }
    );
    if (!!userFeaturePermission) {
      switch (userFeaturePermission.permission) {
        case Permission.User1:
          return userFeaturePermission.permission === Permission.User1;
        case Permission.User2:
          return userFeaturePermission.permission === Permission.User2;
        case Permission.Admin:
          return userFeaturePermission.permission === Permission.Admin;
        default:
          return false;
      }
    }
    return false;
  }
}
