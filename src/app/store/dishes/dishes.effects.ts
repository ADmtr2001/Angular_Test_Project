import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {DishesService} from "../../services/dishes.service";
import {fetchDishes, fetchDishesSuccess} from "./dishes.actions";

@Injectable()
export class DishesEffects {
  fetchDishes$ = createEffect(() => this.actions$.pipe(
    ofType(fetchDishes),
    mergeMap((action) => this.dishesService.fetchDishes(action.queryParams)),
    map((dishes) => fetchDishesSuccess({dishes}))
  ))

  constructor(private actions$: Actions, private dishesService: DishesService) {
  }
}
