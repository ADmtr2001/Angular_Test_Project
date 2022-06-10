import {createAction, props} from "@ngrx/store";
import {RegisterData} from "../../types/Auth/RegisterData.interface";
import {LoginData} from "../../types/Auth/LoginData.interface";
import {User} from "../../types/Auth/User.interface";

export const register = createAction('[User] Register', props<{registerData: RegisterData}>());
export const registerSuccess = createAction('[User] Register Success', props<{user: User}>());
export const registerError = createAction('[User] Register Error', props<{errorMessage: string}>());

export const login = createAction('[User] Login', props<{loginData: LoginData}>());
export const loginSuccess = createAction('[User] Login Success', props<{user: User}>());
export const loginError = createAction('[User] Login Error', props<{errorMessage: string}>());

export const logout = createAction('[User] Logout');
export const logoutSuccess = createAction('[User] Logout Success');

export const checkAuth = createAction('[User] Check Auth');
export const checkAuthSuccess = createAction('[User] Check Auth Success', props<{user: User}>());
export const checkAuthError = createAction('[User] Check Auth Error', props<{errorMessage: string}>());

