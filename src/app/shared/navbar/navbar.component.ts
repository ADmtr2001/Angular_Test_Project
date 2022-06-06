import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {BehaviorSubject} from "rxjs";
import {Order} from "../../types/Order";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public order$: BehaviorSubject<Order>;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.order$ = shoppingCartService.order$;
  }

  ngOnInit(): void {
  }
}
