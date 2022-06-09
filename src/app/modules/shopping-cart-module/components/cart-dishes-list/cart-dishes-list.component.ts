import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Order} from "../../../../types/Order/Order.interface";

@Component({
  selector: 'app-cart-dishes-list',
  templateUrl: './cart-dishes-list.component.html',
  styleUrls: ['./cart-dishes-list.component.scss']
})
export class CartDishesListComponent {
  @Input() order!: Order;

  @Output() increaseAmount = new EventEmitter<string>();
  @Output() decreaseAmount = new EventEmitter<string>();
  @Output() removeItem = new EventEmitter<string>();

  constructor() {
  }

  public increaseItemAmount(id: string): void {
    this.increaseAmount.emit(id);
  }

  public decreaseItemAmount(id: string): void {
    this.decreaseAmount.emit(id);
  }

  public removeCartItem(id: string): void {
    this.removeItem.emit(id);
  }
}
