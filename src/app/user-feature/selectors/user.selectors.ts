import { createSelector } from '@ngrx/store';
import * as userReducer from '../reducer/';
import * as userReducerState from "../reducer/user.reducer"


// export const selectUserState = createFeatureSelector<
//   rootState.State,
//   userReducer.UserState
//   >(userReducer.userFeatureKey);

// export const selectUserState = createFeatureSelector<rootState.State, userReducer.State>(userReducer.userFeatureKey);

//   export const getUserState = createSelector(
//     selectUserState,
//   state => state[userReducer.userFeatureKey]
// );


// export const selectTheUser = createSelector(
//   getUserState,
//   (state: State) => state.loadUserSuccess
// );

// export const selectMainUserState = createFeatureSelector<
//   mainUserState.State,
//   UserState
//   >(mainUserState.mainUserFeatureKey);

//   export const getUserState = createSelector(
//     selectMainUserState,
//   state => state[userReducer.userFeatureKey]
// );

export const selectUser = createSelector(
  userReducer.getUserState,
  userReducerState.getLoadUserSuccess
);

// export const selectUser = createSelector(
//   selectUserState,
//   userReducer.getLoadUserSuccess
// );
