import {ActionReducerMap} from "@ngrx/store";
import {orderReducer, OrderState} from "./order/order.reducer";
import {dishesReducer, DishesState} from "./dishes/dishes.reducer";
import {userReducer, UserState} from "./user/user.reducer";
import {categoriesReducer, CategoriesState} from "./categories/categories.reducer";

interface State {
  order: OrderState;
  dishes: DishesState;
  user: UserState;
  categories: CategoriesState
}

export const reducers: ActionReducerMap<State> = {
  order: orderReducer,
  dishes: dishesReducer,
  user: userReducer,
  categories: categoriesReducer
}
