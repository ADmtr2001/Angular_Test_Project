import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {catchError, first, Observable, of} from "rxjs";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  public canActivate(): boolean | Observable<boolean> {

    return this.authService
      .checkAuth()
      .pipe(
        first(),
        map((data) => {
          this.router.navigate(['']);
          return false;
        }),
        catchError((error) => of(true))
      );
  }
}
