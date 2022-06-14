import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";
import {OrderService} from "../../../../services/order.service";

import {Store} from "@ngrx/store";
import {
  allOrdersErrorSelector,
  allOrdersLoadingSelector,
  allOrdersSelector
} from "../../../../store/order/order.reducer";
import {fetchOrders, setSelectedOrder} from "../../../../store/order/order.actions";

import {OrderModalContentComponent} from "../../../../shared/order-modal-content/order-modal-content.component";

import {OrderResponse} from "../../../../types/Order/Order.interface";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  public orders$: Observable<OrderResponse[]> = this.store.select(allOrdersSelector);
  public isOrdersLoading$: Observable<boolean> = this.store.select(allOrdersLoadingSelector);
  public ordersError$: Observable<string> = this.store.select(allOrdersErrorSelector);

  public displayedColumns: string[] = ['position', 'name', 'price', 'time', 'id'];

  constructor(
    private store: Store,
    private orderService: OrderService
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(fetchOrders());
  }

  public setSelectedOrder(order: OrderResponse): void {
    this.store.dispatch(setSelectedOrder({order}));
    this.orderService.openOrderDialog(OrderModalContentComponent);
  }
}
