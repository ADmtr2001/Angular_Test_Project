import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

import {
  checkAuth,
  checkAuthError,
  checkAuthSuccess, fetchUsers, fetchUsersError, fetchUsersSuccess, login, loginError,
  loginSuccess,
  logoutSuccess, register, registerError,
  registerSuccess
} from "./user.actions";

import {User} from "../../types/Auth/User.interface";

export interface UserState {
  users: ReadonlyArray<User>;
  isUsersLoading: boolean;
  usersError: string;
  user: User | null;
  isUserLoading: boolean;
  userError: string;
  isLogin: boolean;
  loginError: string;
  isSignup: boolean;
  signupError: string;
}

export const initialState: UserState = {
  users: [],
  isUsersLoading: false,
  usersError: '',
  user: null,
  isUserLoading: false,
  userError: '',
  isLogin: false,
  loginError: '',
  isSignup: false,
  signupError: '',
};

export const userReducer = createReducer(
  initialState,
  on(fetchUsers, (state) => {
    return {...state, isUsersLoading: true, usersError: ''};
  }),
  on(fetchUsersSuccess, (state, {users}) => {
    return {...state, users, isUsersLoading: false, usersError: ''};
  }),
  on(fetchUsersError, (state, {errorMessage}) => {
    return {...state, isUsersLoading: false, usersError: errorMessage};
  }),
  on(register, (state) => {
    return {...state, isSignup: true, signupError: ''};
  }),
  on(registerSuccess, (state, {user}) => {
    return {...state, user, isSignup: false, signupError: ''};
  }),
  on(registerError, (state, {errorMessage}) => {
    return {...state, isSignup: false, signupError: errorMessage};
  }),
  on(login, (state) => {
    return {...state, isLogin: true, loginError: ''};
  }),
  on(loginSuccess, (state, {user}) => {
    return {...state, user, isLogin: false, loginError: ''};
  }),
  on(loginError, (state, {errorMessage}) => {
    return {...state, isLogin: false, loginError: errorMessage};
  }),
  on(logoutSuccess, (state) => {
    return {...state, user: null};
  }),
  on(checkAuth, (state) => {
    return {...state, isUserLoading: true, userError: ''};
  }),
  on(checkAuthSuccess, (state, {user}) => {
    return {...state, user, isUserLoading: false, userError: ''};
  }),
  on(checkAuthError, (state, {errorMessage}) => {
    return {...state, isUserLoading: false, userError: errorMessage};
  }),
);

export const userFeatureSelector = createFeatureSelector<UserState>('user');

export const allUsersSelector = createSelector((userFeatureSelector), (state) => state.users);
export const allUsersLoadingSelector = createSelector((userFeatureSelector), (state) => state.isUsersLoading);
export const allUsersErrorSelector = createSelector((userFeatureSelector), (state) => state.usersError);

export const userSelector = createSelector(userFeatureSelector, (state) => state.user);
export const isUserLoadingSelector = createSelector(userFeatureSelector, (state) => state.isUserLoading);
export const userErrorSelector = createSelector(userFeatureSelector, (state) => state.userError);

export const isLoginSelector = createSelector(userFeatureSelector, (state) => state.isLogin);
export const loginErrorSelector = createSelector(userFeatureSelector, (state) => state.loginError);

export const isSignupSelector = createSelector(userFeatureSelector, (state) => state.isSignup);
export const signupErrorSelector = createSelector(userFeatureSelector, (state) => state.signupError);
