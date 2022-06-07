import {Injectable} from '@angular/core';

import {BehaviorSubject, first} from "rxjs";

import {Order, OrderItem} from "../types/Order";
import {Dish} from "../types/Dish";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInfoFormData} from "../types/UserInfoFormData";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public order$: BehaviorSubject<Order> = new BehaviorSubject<Order>({items: [], totalPrice: 0, totalAmount: 0});

  constructor(private http: HttpClient) {
  }

  public addItem(newItem: OrderItem): void {
    const currentOrderItems = this.order$.getValue().items;
    const itemIndex = currentOrderItems.findIndex((item) => item.dish._id === newItem.dish._id);

    if (itemIndex !== -1) {
      currentOrderItems[itemIndex].amount += newItem.amount;
    } else {
      currentOrderItems.push(newItem);
    }

    this.updateOrder(currentOrderItems);
  }

  public removeItem(id: string): void {
    const newItems = this.order$.getValue().items.filter((item) => item.dish._id !== id);
    this.updateOrder(newItems);
  }

  public increaseAmount(id: string): void {
    const newItems = this.order$.getValue().items.map((item) => {
      if (item.dish._id === id) return {dish: item.dish, amount: item.amount + 1};
      return item;
    });

    this.updateOrder(newItems);
  }

  public decreaseAmount(id: string): void {
    const newItems = this.order$.getValue().items.map((item) => {
      if (item.dish._id === id) {
        const newAmount = Math.max(1, item.amount - 1);
        return {dish: item.dish, amount: newAmount};
      }
      return item;
    });

    this.updateOrder(newItems);
  }

  public makeOrder(userInfo: UserInfoFormData): void {
    this.http
      .post<Dish[]>(`${environment.api_url}/order`, {order: this.order$.getValue(), userInfo})
      .pipe(first())
      .subscribe((data) => console.log(data));
  }

  private updateOrder(orderItems: OrderItem[]) {
    const total = orderItems.reduce((acc, cur) => {
      acc.totalPrice += (cur.dish.price * cur.amount);
      acc.totalAmount += cur.amount;
      return acc;
    }, {totalPrice: 0, totalAmount: 0})

    this.order$.next({items: orderItems, totalPrice: total.totalPrice, totalAmount: total.totalAmount});
  }
}
