import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {fetchDishes, fetchDishesError, fetchDishesSuccess, setSelectedDish} from "./dishes.actions";

import {Dish} from "../../types/Dishes/Dish.interface";

export interface DishesState {
  dishes: ReadonlyArray<Dish>;
  isDishesLoading: boolean;
  dishesError: string;
  selectedDish: Dish | null;
}

export const initialState: DishesState = {
  dishes: [],
  isDishesLoading: false,
  dishesError: '',
  selectedDish: null
};

export const dishesReducer = createReducer(
  initialState,
  on(fetchDishes, (state) => {
    return {...state, isDishesLoading: true, dishesError: ''}
  }),
  on(fetchDishesSuccess, (state, {dishes}) => {
    return {...state, dishes, isDishesLoading: false, dishesError: ''};
  }),
  on(fetchDishesError, (state, {errorMessage}) => {
    return {...state, isDishesLoading: false, dishesError: errorMessage};
  }),
  on(setSelectedDish, (state, {dish}) => {
    return {...state, selectedDish: dish};
  })
);

export const dishesFeatureSelector = createFeatureSelector<DishesState>('dishes');

export const dishesSelector = createSelector(dishesFeatureSelector, (state) => state.dishes);
export const isDishesLoadingSelector = createSelector(dishesFeatureSelector, (state) => state.isDishesLoading);
export const dishesErrorSelector = createSelector(dishesFeatureSelector, (state) => state.dishesError);

export const selectedDishSelector = createSelector(dishesFeatureSelector, (state) => state.selectedDish);
