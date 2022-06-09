import {Dish} from "../Dishes/Dish.interface";

export interface Order {
  items: ReadonlyArray<OrderItem>,
  totalPrice: number,
  totalAmount: number,
}

export interface OrderItem {
  dish: Dish;
  amount: number;
}
