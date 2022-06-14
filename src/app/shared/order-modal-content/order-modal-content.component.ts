import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

import {selectedOrderSelector} from "../../store/order/order.reducer";

import {OrderResponse} from "../../types/Order/Order.interface";

@Component({
  selector: 'app-order-modal-content',
  templateUrl: './order-modal-content.component.html',
  styleUrls: ['./order-modal-content.component.scss']
})
export class OrderModalContentComponent implements OnInit {
  public selectedOrder$: Observable<OrderResponse | null> = this.store.select(selectedOrderSelector);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

}
