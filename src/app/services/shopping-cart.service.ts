import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderItem} from "../types";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private orderState: OrderItem[] = [];
  public order$: BehaviorSubject<OrderItem[]> = new BehaviorSubject<OrderItem[]>([]);

  // private orderState2: {[index: string]: OrderItem} = {};
  // public order$: BehaviorSubject<{[index: string]: OrderItem}> = new BehaviorSubject<{[index: string]: OrderItem}>({});

  constructor() { }

  public addItem(newItem: OrderItem): void {
    const itemIndex = this.orderState.findIndex((item) => item.dish._id === newItem.dish._id);

    if (itemIndex !== -1) {
      this.orderState[itemIndex].amount += newItem.amount;
    } else {
      this.orderState.push(newItem);
    }

    this.order$.next(this.orderState);
    console.log(this.orderState);

    // if (this.orderState2[item.dish._id]) {
    //   const newAmount = this.orderState2[item.dish._id].amount + item.amount;
    //   const newItem: OrderItem = {dish: item.dish, amount: newAmount};
    //   this.orderState2 = {...this.orderState2, [item.dish._id]: newItem}
    // } else {
    //   this.orderState2 = {...this.orderState2, [item.dish._id]: item};
    // }
    // this.order$.next(this.orderState2);
  }

  public removeItem(id: string): void {
    this.orderState = this.orderState.filter((item) => item.dish._id !== id);
    this.order$.next(this.orderState);
  }

  public increaseAmount(id: string): void {}

  public decreaseAmount(id: string): void {}
}
