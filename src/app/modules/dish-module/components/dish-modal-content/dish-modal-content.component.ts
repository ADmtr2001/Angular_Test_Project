import { Component, OnInit } from '@angular/core';

import {FormControl} from "@angular/forms";
import {DishesService} from "../../../../services/dishes.service";
import {BehaviorSubject, first} from "rxjs";
import {Dish, OrderItem} from "../../../../types";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

@Component({
  selector: 'app-dish-modal-content',
  templateUrl: './dish-modal-content.component.html',
  styleUrls: ['./dish-modal-content.component.scss']
})
export class DishModalContentComponent implements OnInit {
  public amount = new FormControl('1');
  public selectedDish: Dish | null = null;

  // public selectedDish$: BehaviorSubject<Dish | null>;

  constructor(private dishesService: DishesService, private shoppingCartService: ShoppingCartService) {
    // this.selectedDish$ = this.dishesService.selectedDish$;
  }

  ngOnInit(): void {
    this.dishesService.selectedDish$.subscribe((dish) => this.selectedDish = dish);
  }

  addDishToCart(): void {
    if (!this.selectedDish) return;

    const orderItem: OrderItem = {dish: this.selectedDish, amount: +this.amount.value};
    this.shoppingCartService.addItem(orderItem);
  }
}
