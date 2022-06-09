import {Component} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";
import {orderFeatureSelector} from "../../../../store/order/order.reducer";
import {decreaseItemAmount, increaseItemAmount, removeItem} from "../../../../store/order/order.actions";

import {Observable} from "rxjs";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

import {Order} from "../../../../types/Order/Order.interface";

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent {
  public order$: Observable<Order> = this.store.select(orderFeatureSelector);

  public userInfoForm: FormGroup = this.formBuilder.group({
    "name": ["", [Validators.required]],
    "surname": ["", [Validators.required]],
    "address": ["", [Validators.required]],
    "phoneNumber": ["", [Validators.required]],
  });

  constructor(
    private shoppingCartService: ShoppingCartService,
    private formBuilder: FormBuilder,
    private store: Store) {
  }

  public removeCartItem(id: string): void {
    this.store.dispatch(removeItem({itemId: id}));
  }

  public increaseItemAmount(id: string): void {
    this.store.dispatch(increaseItemAmount({itemId: id}));
  }

  public decreaseItemAmount(id: string): void {
    this.store.dispatch(decreaseItemAmount({itemId: id}));
  }

  public onSubmit(): void {
    this.shoppingCartService.makeOrder(this.userInfoForm.value);
  }
}

