//libs
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login-service.service';

import * as userActions from '../actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private loginService: LoginService
  ) {}

  user$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.loadUsers),
      switchMap(action => {
        return this.loginService
          .login(action.request.email, action.request.password)
          .pipe(
            mergeMap(data => {
              this.router.navigateByUrl('home')
              return [userActions.loadUsersSuccess({ data })]
            }),
            catchError(error =>
              of(
                userActions.loadUsersFailure({
                  error
                })
              )
            )
          );
      })
    );
  });
}
