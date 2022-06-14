import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {exhaustMap, Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {orderSelector} from "../store/order/order.reducer";
import {UserInfoFormData} from "../types/Order/UserInfoFormData.interface";
import {OrderResponse} from "../types/Order/Order.interface";
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
    private dialog: MatDialog) {
  }

  public fetchOrders(): Observable<OrderResponse[]> {
    const url = `${environment.api_url}/order`;
    return this.http.get<OrderResponse[]>(url);
  }

  public makeOrder(userInfo: UserInfoFormData): Observable<void> {
    const url = `${environment.api_url}/order`;
    const order$ = this.store.select(orderSelector);

    return order$.pipe(exhaustMap((order) => this.http.post<void>(url, {order, userInfo})));
  }

  public openOrderDialog<T>(component: ComponentType<T>): void {
    this.dialog.open(component, {width: '80rem',});
  }
}
