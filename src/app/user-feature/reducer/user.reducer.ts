import { act } from '@ngrx/effects';
import { Action, createReducer, on } from '@ngrx/store';
import { FeaturePermission } from 'src/app/shared/permission-control/models/feature-permissions.model';
import { Features } from 'src/app/shared/permission-control/models/features.enum';
import { Permission } from 'src/app/shared/permission-control/models/permission.enum';
import * as fromUserActions from '../actions';
import { IUserRequest, IUserResponse } from '../models/user.model';

export const userFeatureKey = 'user';

export interface UserState {
  loadUser: IUserRequest;
  loadUserSuccess: IUserResponse;
  loadUserFailure: any | Error;
}

let x: FeaturePermission[] =[{feature: Features.All, permission: Permission.Admin}];
const u: IUserResponse = {email:'', name: '', featurePermission: x};

let userReq: IUserRequest = {
  email: '',
  password: ''
}

export const initialState: UserState = {
  loadUser: userReq,
  loadUserFailure: undefined,
  loadUserSuccess: u
};

export const reducer = createReducer(
  initialState,

  on(fromUserActions.loadUsers, (state, action) => ({
    ...state,
    loadUser: action.request
  })),
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
