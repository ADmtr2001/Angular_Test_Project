import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {
  checkAuth,
  checkAuthSuccess,
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  register,
  registerSuccess
} from "./user.actions";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class UserEffects {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(register),
    mergeMap((action) => this.authService.register(action.registerData)),
    map((authData) => {
      localStorage.setItem("token", authData.accessToken);
      this.router.navigate(['']);
      return registerSuccess({user: authData.user});
    })
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap((action) => this.authService.login(action.loginData)),
    map((authData) => {
      localStorage.setItem("token", authData.accessToken);
      this.router.navigate(['']);
      return loginSuccess({user: authData.user});
    })
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
    mergeMap((action) => this.authService.checkAuth()),
    map((authData) => {
      localStorage.setItem("token", authData.accessToken);
      return checkAuthSuccess({user: authData.user});
    })
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router) {
  }
}
