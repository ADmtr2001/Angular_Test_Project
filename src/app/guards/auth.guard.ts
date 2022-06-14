import {Injectable} from '@angular/core';

import {CanActivate, Router} from "@angular/router";
import {catchError, first, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: UserService) {
  }

  canActivate(): boolean | Observable<boolean> {
    return this.authService
      .checkAuth()
      .pipe(
        first(),
        map((data) => {
          if (data.user.role !== 'admin') {
            return true;
          } else {
            this.router.navigate(['admin']);
            return false;
          }
        }),
        catchError((error) => {
          this.router.navigate(['auth']);
          return of(false);
        })
      );
  }
}
