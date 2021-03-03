//libs
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as userActions from '../actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private router: Router) {}

  user$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.loadUsers),
        map(() => this.router.navigateByUrl('home'))
      ),
    { dispatch: false }
  );
}
