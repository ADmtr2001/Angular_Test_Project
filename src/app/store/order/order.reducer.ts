import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {addItem, calculateTotal, decreaseItemAmount, increaseItemAmount, removeItem, resetOrder} from "./order.actions";
import {Order} from "../../types/Order/Order.interface";

export const initialState: Order = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

export const orderReducer = createReducer(
  initialState,
  on(addItem, (state, {orderItem}) => {
    const itemIndex = state.items.findIndex((item) => item.dish._id === orderItem.dish._id);

    if (itemIndex !== -1) {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.dish._id === orderItem.dish._id) return {dish: item.dish, amount: item.amount + 1};
          return item;
        })
      }
    } else {
      return {...state, items: [...state.items, orderItem]}
    }
  }),
  on(removeItem, (state, {itemId}) => {
    return {...state, items: state.items.filter((item) => item.dish._id !== itemId)}
  }),
  on(increaseItemAmount, (state, {itemId}) => {
    return {
      ...state, items: state.items.map((item) => {
        if (item.dish._id === itemId) return {dish: item.dish, amount: item.amount + 1};
        return item;
      })
    }
  }),
  on(decreaseItemAmount, (state, {itemId}) => {
    return {
      ...state,
      items: state.items.map((item) => {
        if (item.dish._id === itemId) {
          const newAmount = Math.max(1, item.amount - 1);
          return {dish: item.dish, amount: newAmount};
        }
        return item;
      })
    }
  }),
  on(calculateTotal, (state) => {
    const total = state.items.reduce((acc, cur) => {
      acc.totalPrice += (cur.dish.price * cur.amount);
      acc.totalAmount += cur.amount;
      return acc;
    }, {totalPrice: 0, totalAmount: 0})

    return {...state, totalPrice: total.totalPrice, totalAmount: total.totalAmount};
  }),
  on(resetOrder, state => initialState)
);

export const orderFeatureSelector = createFeatureSelector<Order>('order');
export const itemsSelector = createSelector(orderFeatureSelector, (state) => state.items);
export const totalPriceSelector = createSelector(orderFeatureSelector, (state) => state.totalPrice);
export const totalAmountSelector = createSelector(orderFeatureSelector, (state) => state.totalAmount);
