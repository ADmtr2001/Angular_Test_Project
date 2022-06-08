import {Component} from '@angular/core';

import {Observable} from "rxjs";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";

import {Order} from "../../../../types/Order/Order";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserInfoFormData} from "../../../../types/Order/UserInfoFormData";

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent {
  public order$: Observable<Order>;

  public userInfoForm: FormGroup = this.formBuilder.group({
    "name": ["", [Validators.required]],
    "surname": ["", [Validators.required]],
    "address": ["", [Validators.required]],
    "phoneNumber": ["", [Validators.required]],
  });

  constructor(private shoppingCartService: ShoppingCartService, private formBuilder: FormBuilder) {
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

  public onSubmit(): void {
    this.shoppingCartService.makeOrder(this.userInfoForm.value);
  }
}

