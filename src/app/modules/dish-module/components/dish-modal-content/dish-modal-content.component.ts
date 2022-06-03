import {Component, OnInit} from '@angular/core';

import {FormControl} from "@angular/forms";
import {DishesService} from "../../../../services/dishes.service";
import {BehaviorSubject} from "rxjs";
import {Dish, OrderItem} from "../../../../types";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

@Component({
  selector: 'app-dish-modal-content',
  templateUrl: './dish-modal-content.component.html',
  styleUrls: ['./dish-modal-content.component.scss']
})
export class DishModalContentComponent implements OnInit {
  public amount = new FormControl('1');

  public selectedDish$: BehaviorSubject<Dish>;

  constructor(private dishesService: DishesService, private shoppingCartService: ShoppingCartService) {
    this.selectedDish$ = this.dishesService.selectedDish$;
  }

  ngOnInit(): void {
  }

  addDishToCart(dish: Dish): void {
    const orderItem: OrderItem = {dish, amount: +this.amount.value};
    this.shoppingCartService.addItem(orderItem);
  }
}
