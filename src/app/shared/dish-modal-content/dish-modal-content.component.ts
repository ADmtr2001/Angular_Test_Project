import {Component} from '@angular/core';

import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {addItem} from "../../store/order/order.actions";
import {selectedDishSelector} from "../../store/dishes/dishes.reducer";

import {OrderItem} from "../../types/Order/Order.interface";
import {Dish} from "../../types/Dishes/Dish.interface";

@Component({
  selector: 'app-dish-modal-content',
  templateUrl: './dish-modal-content.component.html',
  styleUrls: ['./dish-modal-content.component.scss']
})
export class DishModalContentComponent {
  public amount: FormControl = new FormControl('1');

  public selectedDish$: Observable<Dish | null> = this.store.select(selectedDishSelector);

  constructor(private store: Store) {
  }

  public addDishToCart(dish: Dish): void {
    const orderItem: OrderItem = {dish, amount: +this.amount.value};
    this.store.dispatch(addItem({orderItem}));
  }
}
