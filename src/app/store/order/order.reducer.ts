import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {addItem, calculateTotal, decreaseItemAmount, increaseItemAmount, removeItem, resetOrder} from "./order.actions";
import {Order, OrderItem} from "../../types/Order/Order.interface";

export const initialState: Order = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

const increaseAmount = (items: readonly OrderItem[], itemId: string): OrderItem[] => {
  return items.map((item) => {
    if (item.dish._id === itemId) return {dish: item.dish, amount: item.amount + 1};
    return item;
  })
}

const decreaseAmount = (items: readonly OrderItem[], itemId: string): OrderItem[] => {
  return items.map((item) => {
    if (item.dish._id === itemId) {
      const newAmount = Math.max(1, item.amount - 1);
      return {dish: item.dish, amount: newAmount};
    }
    return item;
  })
}

const calcTotal = (items: readonly OrderItem[]): { totalPrice: number, totalAmount: number } => {
  return items.reduce((acc, cur) => {
    acc.totalPrice += (cur.dish.price * cur.amount);
    acc.totalAmount += cur.amount;
    return acc;
  }, {totalPrice: 0, totalAmount: 0})
}

export const orderReducer = createReducer(
  initialState,
  on(addItem, (state, {orderItem}) => {
    const itemIndex = state.items.findIndex((item) => item.dish._id === orderItem.dish._id);
    return itemIndex !== -1
      ? {...state, items: increaseAmount(state.items, orderItem.dish._id)}
      : {...state, items: [...state.items, orderItem]}
  }),
  on(removeItem, (state, {itemId}) => {
    return {...state, items: state.items.filter((item) => item.dish._id !== itemId)}
  }),
  on(increaseItemAmount, (state, {itemId}) => {
    return {...state, items: increaseAmount(state.items, itemId)}
  }),
  on(decreaseItemAmount, (state, {itemId}) => {
    return {...state, items: decreaseAmount(state.items, itemId)};
  }),
  on(calculateTotal, (state) => {
    const total = calcTotal(state.items);
    return {...state, totalPrice: total.totalPrice, totalAmount: total.totalAmount};
  }),
  on(resetOrder, state => initialState)
);

export const orderFeatureSelector = createFeatureSelector<Order>('order');
export const itemsSelector = createSelector(orderFeatureSelector, (state) => state.items);
export const totalPriceSelector = createSelector(orderFeatureSelector, (state) => state.totalPrice);
export const totalAmountSelector = createSelector(orderFeatureSelector, (state) => state.totalAmount);
