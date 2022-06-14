import {createAction, props} from "@ngrx/store";

import {OrderItem, OrderResponse} from "../../types/Order/Order.interface";

export const fetchOrders = createAction('[Order] Fetch Orders');
export const fetchOrdersSuccess = createAction('[Order] Fetch Order Success', props<{orders: OrderResponse[]}>());
export const fetchOrdersError = createAction('[Order] Fetch Order Error', props<{errorMessage: string}>());

export const addItem = createAction('[Order] Add Item', props<{orderItem: OrderItem}>());
export const removeItem = createAction('[Order] Remove Item', props<{itemId: string}>());

export const increaseItemAmount = createAction('[Order] Increase Item Amount', props<{itemId: string}>());
export const decreaseItemAmount = createAction('[Order] Decrease Item Amount', props<{itemId: string}>());

export const calculateTotal = createAction('[Order] Calculate Total');
export const resetOrder = createAction('[Order] Reset Order');

export const setSelectedOrder = createAction('[Dishes] Set Selected Order', props<{order: OrderResponse}>());
