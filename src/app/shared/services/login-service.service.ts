import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IUserResponse } from 'src/app/user-feature/models/user.model';
import { Features } from '../permission-control/models/features.enum';
import { Permission } from '../permission-control/models/permission.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  admin: IUserResponse = {
    email: 'admin@company.com',
    name: 'George the Admin',
    featurePermission: [
      {
        feature: Features.All,
        permission: Permission.Admin
      }
    ]
  };

  user1: IUserResponse = {
    email: 'user1@company.com',
    name: 'Norman the User 1',
    featurePermission: [
      {
        feature: Features.Section1,
        permission: Permission.User1
      }
    ]
  };

  user2: IUserResponse = {
    email: 'user2@company.com',
    name: 'Cleo the User 2',
    featurePermission: [
      {
        feature: Features.Section2,
        permission: Permission.User2
      }
    ]
  };

  user3: IUserResponse = {
    email: '',
    name: '',
    featurePermission: [
      {
        feature: Features.None,
        permission: Permission.None
      }
    ]
  };

  login(name: string, password: string): Observable<IUserResponse> {
    let userResponse: IUserResponse;

    switch (name) {
      case this.admin.email:
        userResponse = this.admin
        break;
      case this.user1.email:
        userResponse = this.user1;
        break;
      case this.user2.email:
        userResponse = this.user2;
        break;

      default:
        userResponse = this.user3;
        break;
    }
    console.log('userResponse', userResponse);
    return of(userResponse).pipe(delay(100));
  }
}
