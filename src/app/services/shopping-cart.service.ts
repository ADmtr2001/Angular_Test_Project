import {Injectable} from '@angular/core';

import {BehaviorSubject, first, Observable} from "rxjs";

import {Order, OrderItem} from "../types/Order/Order";
import {Dish} from "../types/Dishes/Dish";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInfoFormData} from "../types/Order/UserInfoFormData";
import {Router} from "@angular/router";

// initial value

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // private readonly
  private orderSubj$: BehaviorSubject<Order> = new BehaviorSubject<Order>({items: [], totalPrice: 0, totalAmount: 0});
  public order$: Observable<Order> = this.orderSubj$.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  public addItem(newItem: OrderItem): void {
    const currentOrderItems = this.orderSubj$.getValue().items;
    const itemIndex = currentOrderItems.findIndex((item) => item.dish._id === newItem.dish._id);

    if (itemIndex !== -1) {
      currentOrderItems[itemIndex].amount += newItem.amount;
    } else {
      currentOrderItems.push(newItem);
    }

    this.updateOrder(currentOrderItems);
  }

  public removeItem(id: string): void {
    const newItems = this.orderSubj$.getValue().items.filter((item) => item.dish._id !== id);
    this.updateOrder(newItems);
  }

  public increaseAmount(id: string): void {
    const newItems = this.orderSubj$.getValue().items.map((item) => {
      if (item.dish._id === id) return {dish: item.dish, amount: item.amount + 1};
      return item;
    });

    this.updateOrder(newItems);
  }

  public decreaseAmount(id: string): void {
    const newItems = this.orderSubj$.getValue().items.map((item) => {
      if (item.dish._id === id) {
        const newAmount = Math.max(1, item.amount - 1);
        return {dish: item.dish, amount: newAmount};
      }
      return item;
    });

    this.updateOrder(newItems);
  }

  public makeOrder(userInfo: UserInfoFormData): void {
    const order = this.orderSubj$.getValue();
    this.http
      .post<Dish[]>(`${environment.api_url}/order`, {order, userInfo})
      .pipe(first())
      .subscribe((data) => {
        this.orderSubj$.next({items: [], totalPrice: 0, totalAmount: 0});
        this.router.navigate(['']);
      });
  }

  private updateOrder(orderItems: OrderItem[]) {
    const total = orderItems.reduce((acc, cur) => {
      acc.totalPrice += (cur.dish.price * cur.amount);
      acc.totalAmount += cur.amount;
      return acc;
    }, {totalPrice: 0, totalAmount: 0})

    this.orderSubj$.next({items: orderItems, totalPrice: total.totalPrice, totalAmount: total.totalAmount});
  }
}
