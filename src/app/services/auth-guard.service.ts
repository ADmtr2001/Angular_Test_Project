import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private $user = new BehaviorSubject<User | null>(null)

  constructor(private router: Router, private authService: AuthService) {
    this.$user = authService.user$;
  }

  canActivate(): boolean {
    if (!this.$user.getValue()) {
      this.router.navigate(['auth']);
      return false;
    }

    return true;
  }
}
