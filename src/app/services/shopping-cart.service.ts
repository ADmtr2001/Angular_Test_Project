import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";

import {Store} from "@ngrx/store";
import {resetOrder} from "../store/order/order.actions";
import {orderFeatureSelector} from "../store/order/order.reducer";

import {Dish} from "../types/Dishes/Dish.interface";
import {UserInfoFormData} from "../types/Order/UserInfoFormData.interface";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store) {
  }

  public makeOrder(userInfo: UserInfoFormData): void {
    const url = `${environment.api_url}/order`;
    const order$ = this.store.select(orderFeatureSelector);

    order$.pipe(first()).subscribe((order) => {
      this.http.post<Dish[]>(url, {order, userInfo})
        .pipe(first())
        .subscribe((data) => {
          this.store.dispatch(resetOrder());
          this.router.navigate(['']);
        });
    })
  }

}
