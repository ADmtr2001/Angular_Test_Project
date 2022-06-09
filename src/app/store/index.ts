import {ActionReducerMap} from "@ngrx/store";
import {Order} from "../types/Order/Order.interface";
import {orderReducer} from "./order/order.reducer";
import {dishesReducer, DishesState} from "./dishes/dishes.reducer";
import {userReducer, UserState} from "./user/user.reducer";

interface State {
  order: Order;
  dishes: DishesState;
  user: UserState;
}

export const reducers: ActionReducerMap<State> = {
  order: orderReducer,
  dishes: dishesReducer,
  user: userReducer
}
