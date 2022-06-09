import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {User} from "../../types/Auth/User.interface";
import {checkAuthSuccess, loginSuccess, logoutSuccess, registerSuccess} from "./user.actions";

export interface UserState {
  user: User | null;
  // loading
}

export const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(registerSuccess, (state, {user}) => {
    return {...state, user};
  }),
  on(loginSuccess, (state, {user}) => {
    return {...state, user};
  }),
  on(logoutSuccess, (state) => {
    return {...state, user: null};
  }),
  on(checkAuthSuccess, (state, {user}) => {
    return {...state, user};
  }),
);

export const userFeatureSelector = createFeatureSelector<UserState>('user');
export const userSelector = createSelector(userFeatureSelector, (state) => state.user);
