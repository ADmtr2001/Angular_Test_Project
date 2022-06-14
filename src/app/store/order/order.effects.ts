import {Injectable} from '@angular/core';

import {catchError, of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';

import {
  addItem,
  calculateTotal,
  decreaseItemAmount,
  fetchOrders, fetchOrdersError, fetchOrdersSuccess,
  increaseItemAmount,
  removeItem
} from "./order.actions";

import {OrderService} from "../../services/order.service";

@Injectable()
export class OrderEffects {
  calculateTotal$ = createEffect(() => this.actions$.pipe(
    ofType(addItem, decreaseItemAmount, increaseItemAmount, removeItem),
    map((action) => {
      return calculateTotal();
    })
  ));

  fetchOrders$ = createEffect(() => this.actions$.pipe(
    ofType(fetchOrders),
    mergeMap((action) => this.orderService.fetchOrders()),
    map((orderResponse) => fetchOrdersSuccess({orders: orderResponse})),
    catchError((errorMessage) => of(fetchOrdersError({errorMessage})))
  ))

  constructor(
    private actions$: Actions,
    private orderService: OrderService) {
  }
}
