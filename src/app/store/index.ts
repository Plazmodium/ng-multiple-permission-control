import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as userReducer from '../user-feature/reducer/user.reducer';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  [userReducer.userFeatureKey]: userReducer.UserState;
}

export const reducers: ActionReducerMap<State, Action> = {
  router: fromRouter.routerReducer,
  [userReducer.userFeatureKey]: userReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
