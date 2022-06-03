import {Injectable} from '@angular/core';

import {BehaviorSubject} from "rxjs";

import {OrderItem} from "../types";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public order$: BehaviorSubject<OrderItem[]> = new BehaviorSubject<OrderItem[]>([]);
  // extend object

  constructor() {
  }

  public addItem(newItem: OrderItem): void {
    const currentOrder = this.order$.getValue();
    const itemIndex = currentOrder.findIndex((item) => item.dish._id === newItem.dish._id);

    if (itemIndex !== -1) {
      currentOrder[itemIndex].amount += newItem.amount;
    } else {
      currentOrder.push(newItem);
    }

    // private method for re-calculation
    this.order$.next(currentOrder);
  }

  public removeItem(id: string): void {
    const newOrder = this.order$.getValue().filter((item) => item.dish._id !== id);
    this.order$.next(newOrder);
  }

  public increaseAmount(id: string): void {
    const newOrder = this.order$.getValue().map((item) => {
      if (item.dish._id === id) return {dish: item.dish, amount: item.amount + 1};
      return item;
    });

    this.order$.next(newOrder);
  }

  public decreaseAmount(id: string): void {
    const newOrder = this.order$.getValue().map((item) => {
      if (item.dish._id === id) {
        const newAmount = Math.max(1, item.amount - 1);
        return {dish: item.dish, amount: newAmount};
      }
      return item;
    });

    this.order$.next(newOrder);
  }
}
