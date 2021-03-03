import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: User }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any | Error }>()
);