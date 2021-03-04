import { createAction, props } from '@ngrx/store';
import { IUserRequest, IUserResponse } from '../models/user.model';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{request: IUserRequest}>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: IUserResponse }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any | Error }>()
);
