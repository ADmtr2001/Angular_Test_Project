import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Order} from "../../../../types/Order";
import {UserInfoFormData} from "../../../../types/UserInfoFormData";

@Component({
  selector: 'app-cart-user-info',
  templateUrl: './cart-user-info.component.html',
  styleUrls: ['./cart-user-info.component.scss']
})
export class CartUserInfoComponent {
  @Input() order!: Order;
  @Input() form!: FormGroup;

  @Output() formSubmit: EventEmitter<UserInfoFormData> = new EventEmitter<UserInfoFormData>()

  constructor() { }

  public onSubmit(): void {
    this.formSubmit.emit(this.form.value);
  }
}
