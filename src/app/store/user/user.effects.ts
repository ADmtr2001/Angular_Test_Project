import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {
  checkAuth, checkAuthError,
  checkAuthSuccess,
  login, loginError,
  loginSuccess,
  logout,
  logoutSuccess,
  register, registerError,
  registerSuccess
} from "./user.actions";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";

@Injectable()
export class UserEffects {
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
    private authService: AuthService,
    private router: Router) {
  }
}
