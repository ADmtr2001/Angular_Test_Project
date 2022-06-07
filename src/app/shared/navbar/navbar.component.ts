import { Component } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {BehaviorSubject} from "rxjs";
import {Order} from "../../types/Order";
import {AuthService} from "../../services/auth.service";
import {User} from "../../types/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public order$: BehaviorSubject<Order>;
  public user$: BehaviorSubject<User | null>;

  constructor(private shoppingCartService: ShoppingCartService, private authService: AuthService) {
    this.order$ = shoppingCartService.order$;
    this.user$ = authService.user$;
  }

  public logout(): void {
    this.authService.logout();
  }
}
