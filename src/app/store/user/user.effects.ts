import {Injectable} from "@angular/core";

import {Router} from "@angular/router";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {catchError, of} from "rxjs";

import {
  checkAuth, checkAuthError,
  checkAuthSuccess, fetchUsers, fetchUsersError, fetchUsersSuccess,
  login, loginError,
  loginSuccess,
  logout,
  logoutSuccess,
  register, registerError,
  registerSuccess
} from "./user.actions";

import {UserService} from "../../services/user.service";

@Injectable()
export class UserEffects {
  fetchUsers$ = createEffect(() => this.actions$.pipe(
    ofType(fetchUsers),
    mergeMap((action) => this.authService.fetchUsers()),
    map((users) => fetchUsersSuccess({users})),
    catchError((errorMessage) => of(fetchUsersError({errorMessage})))
  ))

  register$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    mergeMap((action) => this.authService
      .register(action.registerData)
      .pipe(
        map((authData) => {
          localStorage.setItem("token", authData.accessToken);
          this.router.navigate(['']);
          return registerSuccess({user: authData.user});
        }),
        catchError((errorMessage) => of(registerError({errorMessage})))
      )),
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap((action) => this.authService
      .login(action.loginData)
      .pipe(
        map((authData) => {
          localStorage.setItem("token", authData.accessToken);
          this.router.navigate(['']);
          return loginSuccess({user: authData.user});
        }),
        catchError((errorMessage) => of(loginError({errorMessage})))
      )),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    mergeMap((action) => this.authService.logout()),
    map(() => {
      localStorage.removeItem('token');
      this.router.navigate(['auth']);
      return logoutSuccess();
    })
  ));

  checkAuth$ = createEffect(() => this.actions$.pipe(
    ofType(checkAuth),
    mergeMap((action) => this.authService
      .checkAuth()
      .pipe(
        map((authData) => {
          localStorage.setItem("token", authData.accessToken);
          return checkAuthSuccess({user: authData.user});
        }),
        catchError((errorMessage) => of(checkAuthError({errorMessage})))
      ))
  ));

  constructor(
    private actions$: Actions,
    private authService: UserService,
    private router: Router) {
  }
}
