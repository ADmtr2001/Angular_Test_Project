import {Component, EventEmitter, Input, Output} from '@angular/core';

import {AbstractControl, FormGroup} from "@angular/forms";

import {Order} from "../../../../types/Order/Order.interface";

@Component({
  selector: 'app-cart-user-info',
  templateUrl: './cart-user-info.component.html',
  styleUrls: ['./cart-user-info.component.scss']
})
export class CartUserInfoComponent {
  @Input() order!: Order;
  @Input() form!: FormGroup;

  @Output() formSubmit: EventEmitter<void> = new EventEmitter<void>()

  public get nameControl(): AbstractControl | null {return this.form.get('name')};
  public get surnameControl(): AbstractControl | null {return this.form.get('surname')};
  public get addressControl(): AbstractControl | null {return this.form.get('address')};
  public get phoneNumberControl(): AbstractControl | null {return this.form.get('phoneNumber')};

  constructor() { }

  public onSubmit(): void {
    this.formSubmit.emit();
  }
}
