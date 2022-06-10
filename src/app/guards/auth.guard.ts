import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {catchError, first, Observable, of} from "rxjs";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean | Observable<boolean> {
    return this.authService
      .checkAuth()
      .pipe(
        first(),
        map((data) => data.user.role !== 'admin'),
        catchError((error) => {
          this.router.navigate(['auth']);
          return of(false);
        })
      );
  }
}
