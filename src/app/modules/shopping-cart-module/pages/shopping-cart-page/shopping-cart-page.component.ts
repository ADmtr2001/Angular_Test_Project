import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

import {BehaviorSubject} from "rxjs";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

import {OrderItem} from "../../../../types";

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {
  public order$: BehaviorSubject<OrderItem[]>;

  public name = new FormControl('');
  public surname = new FormControl('');
  public address = new FormControl('');
  public phoneNumber = new FormControl('')

  constructor(private shoppingCartService: ShoppingCartService) {
    this.order$ = shoppingCartService.order$;
  }

  ngOnInit(): void {
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
