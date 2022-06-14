import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

import {
  addItem,
  calculateTotal,
  decreaseItemAmount,
  fetchOrders, fetchOrdersError, fetchOrdersSuccess,
  increaseItemAmount,
  removeItem,
  resetOrder, setSelectedOrder
} from "./order.actions";

import {Order, OrderItem, OrderResponse} from "../../types/Order/Order.interface";

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

export interface OrderState {
  orders: OrderResponse[];
  isOrdersLoading: boolean;
  ordersError: string;
  order: Order;
  selectedOrder: OrderResponse | null;
}

export const initialState: OrderState = {
  orders: [],
  isOrdersLoading: false,
  ordersError: '',
  selectedOrder: null,
  order: {
    items: [],
    totalPrice: 0,
    totalAmount: 0,
  }
};

export const orderReducer = createReducer(
  initialState,
  on(fetchOrders, (state) => {
    return {...state, isOrdersLoading: true, ordersError: ''}
  }),
  on(fetchOrdersSuccess, (state, {orders}) => {
    return {...state, orders, isOrdersLoading: false, ordersError: ''}
  }),
  on(fetchOrdersError, (state, {errorMessage}) => {
    return {...state, isOrdersLoading: false, ordersError: errorMessage}
  }),
  on(addItem, (state, {orderItem}) => {
    const itemIndex = state.order.items.findIndex((item) => item.dish._id === orderItem.dish._id);

    if (itemIndex !== -1) {
      return {
        ...state,
        order: {...state.order, items: increaseAmount(state.order.items, orderItem.dish._id)}
      }
    }

    return {
      ...state,
      order: {...state.order, items:  [...state.order.items, orderItem]}
    }
  }),
  on(removeItem, (state, {itemId}) => {
    return{
      ...state,
      order: { ...state.order, items: state.order.items.filter((item) => item.dish._id !== itemId)}
    }
  }),
  on(increaseItemAmount, (state, {itemId}) => {
    return {
      ...state,
      order: {
        ...state.order,
        items: increaseAmount(state.order.items, itemId)
      }
    }
  }),
  on(decreaseItemAmount, (state, {itemId}) => {
    return {
      ...state,
      order: {
        ...state.order,
        items: decreaseAmount(state.order.items, itemId)
      }
    };
  }),
  on(calculateTotal, (state) => {
    const total = calcTotal(state.order.items);
    return {
      ...state,
      order: {
        ...state.order,
        totalPrice: total.totalPrice,
        totalAmount: total.totalAmount
      }
    };
  }),
  on(setSelectedOrder, (state, {order}) => {
    return {...state, selectedOrder: order};
  }),
  on(resetOrder, state => initialState)
);

export const orderFeatureSelector = createFeatureSelector<OrderState>('order');

export const allOrdersSelector = createSelector(orderFeatureSelector, (state) => state.orders);
export const allOrdersLoadingSelector = createSelector(orderFeatureSelector, (state) => state.isOrdersLoading);
export const allOrdersErrorSelector = createSelector(orderFeatureSelector, (state) => state.ordersError);

export const orderSelector = createSelector(orderFeatureSelector, (state) => state.order);
export const itemsSelector = createSelector(orderFeatureSelector, (state) => state.order.items);
export const totalPriceSelector = createSelector(orderFeatureSelector, (state) => state.order.totalPrice);
export const totalAmountSelector = createSelector(orderFeatureSelector, (state) => state.order.totalAmount);

export const selectedOrderSelector = createSelector(orderFeatureSelector, (state) => state.selectedOrder);
