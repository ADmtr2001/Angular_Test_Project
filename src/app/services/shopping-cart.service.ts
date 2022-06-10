import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";

import {Store} from "@ngrx/store";
import {orderFeatureSelector} from "../store/order/order.reducer";
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

  public makeOrder(userInfo: UserInfoFormData): Observable<void> {
    const url = `${environment.api_url}/order`;
    const order$ = this.store.select(orderFeatureSelector);

    return order$.pipe(switchMap((order) => this.http.post<void>(url, {order, userInfo})));
  }
}
