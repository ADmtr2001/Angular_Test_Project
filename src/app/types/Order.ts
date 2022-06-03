import Dish from "./Dish";

export interface Order {
  items: OrderItem[],
  totalPrice: number
}

export interface OrderItem {
  dish: Dish;
  amount: number;
}
