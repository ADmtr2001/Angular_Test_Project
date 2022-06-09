import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {fetchDishes, fetchDishesSuccess, setSelectedDish} from "./dishes.actions";

import {Dish} from "../../types/Dishes/Dish.interface";

export interface DishesState {
  dishes: ReadonlyArray<Dish>;
  selectedDish: Dish | null;
  isDishesLoading: boolean;
}

export const initialState: DishesState = {
  dishes: [],
  selectedDish: null,
  isDishesLoading: false,
};

export const dishesReducer = createReducer(
  initialState,
  on(fetchDishes, (state) => {
    return {...state, isDishesLoading: true}
  }),
  on(fetchDishesSuccess, (state, {dishes}) => {
    return {...state, dishes, isDishesLoading: false};
  }),
  on(setSelectedDish, (state, {dish}) => {
    return {...state, selectedDish: dish};
  })
);

export const dishesFeatureSelector = createFeatureSelector<DishesState>('dishes');
export const dishesSelector = createSelector(dishesFeatureSelector, (state) => state.dishes);
export const selectedDishSelector = createSelector(dishesFeatureSelector, (state) => state.selectedDish);
export const isDishesLoadingSelector = createSelector(dishesFeatureSelector, (state) => state.isDishesLoading);
