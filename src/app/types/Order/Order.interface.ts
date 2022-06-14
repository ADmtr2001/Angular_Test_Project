import {Dish} from "../Dishes/Dish.interface";
import {UserInfoFormData} from "./UserInfoFormData.interface";

export interface OrderItem {
  dish: Dish;
  amount: number;
}

export interface Order {
  items: ReadonlyArray<OrderItem>,
  totalPrice: number,
  totalAmount: number,
}

export interface OrderResponse {
  _id: string;
  order: Order;
  userInfo: UserInfoFormData;
  createdAt: string;
}




