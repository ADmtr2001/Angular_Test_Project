import {Component} from '@angular/core';

import {FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

import {DishesService} from "../../services/dishes.service";
import {ShoppingCartService} from "../../services/shopping-cart.service";

import {Dish} from "../../types/Dish";
import {OrderItem} from "../../types/Order";

@Component({
  selector: 'app-dish-modal-content',
  templateUrl: './dish-modal-content.component.html',
  styleUrls: ['./dish-modal-content.component.scss']
})
export class DishModalContentComponent {
  public amount = new FormControl('1');

  public selectedDish$: BehaviorSubject<Dish>;

  constructor(private dishesService: DishesService, private shoppingCartService: ShoppingCartService) {
    this.selectedDish$ = this.dishesService.selectedDish$;
  }

  public addDishToCart(dish: Dish): void {
    const orderItem: OrderItem = {dish, amount: +this.amount.value};
    this.shoppingCartService.addItem(orderItem);
  }
}
