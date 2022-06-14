import {Injectable} from '@angular/core';

import {CanActivate, Router} from "@angular/router";
import {catchError, first, Observable, of} from "rxjs";
import {map} from "rxjs/operators";

import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: UserService) {
  }

  public canActivate(): boolean | Observable<boolean> {
    return this.authService
      .checkAuth()
      .pipe(
        first(),
        map((data) => {
          if (data.user.role !== 'admin') {
            this.router.navigate(['']);
            return false;
          } else {
            this.router.navigate(['auth']);
            return false;
          }
        }),
        catchError((error) => of(true))
      );
  }
}
