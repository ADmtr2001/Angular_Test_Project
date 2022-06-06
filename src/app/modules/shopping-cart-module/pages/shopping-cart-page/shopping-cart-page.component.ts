import {Component} from '@angular/core';

import {BehaviorSubject} from "rxjs";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

import {Order} from "../../../../types/Order";

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent {
  public order$: BehaviorSubject<Order>;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.order$ = shoppingCartService.order$;
  }

  public removeCartItem(id: string): void {
    this.shoppingCartService.removeItem(id);
  }

  public increaseItemAmount(id: string): void {
    this.shoppingCartService.increaseAmount(id);
  }

  public decreaseItemAmount(id: string): void {
    this.shoppingCartService.decreaseAmount(id);
  }
}
