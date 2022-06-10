import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {DishesService} from "../../services/dishes.service";
import {
  fetchCategories,
  fetchCategoriesError,
  fetchCategoriesSuccess,
  fetchDishes,
  fetchDishesError,
  fetchDishesSuccess
} from "./dishes.actions";
import {catchError, of} from "rxjs";

@Injectable()
export class DishesEffects {
  fetchDishes$ = createEffect(() => this.actions$.pipe(
    ofType(fetchDishes),
    mergeMap((action) => this.dishesService
      .fetchDishes(action.queryParams)
      .pipe(
        map((dishes) => fetchDishesSuccess({dishes})),
        catchError((errorMessage) => of(fetchDishesError({errorMessage})))
      )
    ),
  ));

  fetchCategories$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCategories),
    mergeMap((action) => this.dishesService
      .fetchCategories()
      .pipe(
        map((categories) => fetchCategoriesSuccess({categories: [{_id: '', name: 'All'}, ...categories]})),
        catchError((errorMessage) => of(fetchCategoriesError({errorMessage})))
      )
    ),
  ));

  constructor(private actions$: Actions, private dishesService: DishesService) {
  }
}
