import {Injectable} from '@angular/core';

import {addItem, calculateTotal, decreaseItemAmount, increaseItemAmount, removeItem} from "./order.actions";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';

@Injectable()
export class OrderEffects {
  calculateTotal$ = createEffect(() => this.actions$.pipe(
    ofType(addItem, decreaseItemAmount, increaseItemAmount, removeItem),
    map((action) => {
      return calculateTotal();
    })
  ));

  constructor(private actions$: Actions) {
  }
}
