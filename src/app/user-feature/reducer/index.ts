import {
  Action,
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromUserReducer from './user.reducer';

export const groupsFeatureKey = 'main-user';

export interface GroupState {
  [fromUserReducer.userFeatureKey]: fromUserReducer.UserState;
}

export interface State {
  [groupsFeatureKey]: GroupState;
}

export function reducers(state: GroupState | undefined, action: Action) {
  return combineReducers({
    [fromUserReducer.userFeatureKey]: fromUserReducer.reducer
  })(state, action);
}

//Select root state
export const selectState = createFeatureSelector<State, GroupState>(
  groupsFeatureKey
);

//select feature state
export const getUserState = createSelector(
  selectState,
  state => state[fromUserReducer.userFeatureKey]
);
