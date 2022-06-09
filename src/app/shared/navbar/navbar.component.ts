import {Component} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {orderFeatureSelector} from "../../store/order/order.reducer";
import {userSelector} from "../../store/user/user.reducer";
import {logout} from "../../store/user/user.actions";

import {User} from "../../types/Auth/User.interface";
import {Order} from "../../types/Order/Order.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public order$: Observable<Order> = this.store.select(orderFeatureSelector);
  public user$: Observable<User | null> = this.store.select(userSelector);

  constructor(private store: Store) {
  }

  public logout(): void {
    this.store.dispatch(logout());
  }
}
