import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {fetchDishes, fetchDishesError, fetchDishesSuccess} from "./dishes.actions";
import {catchError, of} from "rxjs";

import {DishesService} from "../../services/dishes.service";

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

  constructor(
    private actions$: Actions,
    private dishesService: DishesService) {
  }
}
