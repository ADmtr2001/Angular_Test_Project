import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-cart-user-info',
  templateUrl: './cart-user-info.component.html',
  styleUrls: ['./cart-user-info.component.scss']
})
export class CartUserInfoComponent {
  // Form Group later
  public name = new FormControl('');
  public surname = new FormControl('');
  public address = new FormControl('');
  public phoneNumber = new FormControl('')

  constructor() { }
}
