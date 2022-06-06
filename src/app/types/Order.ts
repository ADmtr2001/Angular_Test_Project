import Dish from "./Dish";

export interface Order {
  items: OrderItem[],
  totalPrice: number,
  totalAmount: number,
}

export interface OrderItem {
  dish: Dish;
  amount: number;
}
