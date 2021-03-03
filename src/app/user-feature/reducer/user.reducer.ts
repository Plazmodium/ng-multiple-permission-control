import { act } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { FeaturePermission } from 'src/app/shared/permission-control/models/feature-permissions.model';
import { Features } from 'src/app/shared/permission-control/models/features.enum';
import { Permission } from 'src/app/shared/permission-control/models/permission.enum';
import * as fromUserActions from '../actions';
import { User } from '../models/user.model';

export const userFeatureKey = 'user';

export interface UserState {
  loadUser: User;
  loadUserSuccess: User;
  loadUserFailure: any | Error;
}

let x: FeaturePermission[] =[{feature: Features.All, permission: Permission.Admin}];
const u: User = {email:'', name: '', featurePermission: x};

export const initialState: UserState = {
  loadUser: u,
  loadUserFailure: undefined,
  loadUserSuccess: u
};

export const reducer = createReducer(
  initialState,

  // on(fromUserActions.loadUsers, (state, action) => ({
  //   ...state,
  //   loadUser: action.type
  // })),
  on(fromUserActions.loadUsersSuccess, (state, action) => ({
    ...state,
    loadUserSuccess: action.data
  })),
  on(fromUserActions.loadUsersFailure, (state, action) => ({
    ...state,
    loadUserFailure: action.error
  }))
);

export const getLoadUser = (state: UserState) => state.loadUser;
export const getLoadUserSuccess = (state: UserState) => state.loadUserSuccess;
export const getLoadUserFailure = (state: UserState) => state.loadUserFailure;
