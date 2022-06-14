import {createAction, props} from "@ngrx/store";

import {Dish} from "../../types/Dishes/Dish.interface";
import {Params} from "@angular/router";

export const fetchDishes = createAction('[Dishes] Fetch Dishes', props<{queryParams: Params}>());
export const fetchDishesSuccess = createAction('[Dishes] Fetch Dishes Success', props<{dishes: Dish[]}>());
export const fetchDishesError = createAction('[Dishes] Fetch Dishes Error', props<{errorMessage: string}>());

export const setSelectedDish = createAction('[Dishes] Set Selected Dish', props<{dish: Dish}>());
