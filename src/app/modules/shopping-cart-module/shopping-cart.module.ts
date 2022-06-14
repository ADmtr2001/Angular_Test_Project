import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material-module/material.module";

import {ShoppingCartPageComponent} from "./pages/shopping-cart-page/shopping-cart-page.component";
import {RouterModule} from "@angular/router";
import { CartDishesListComponent } from './components/cart-dishes-list/cart-dishes-list.component';
import { CartUserInfoComponent } from './components/cart-user-info/cart-user-info.component';
import {ShoppingCartRoutingModule} from "./shopping-cart-routing.module";

const ShoppingCartComponents = [
  ShoppingCartPageComponent
];

@NgModule({
  declarations: [ShoppingCartComponents, CartDishesListComponent, CartUserInfoComponent],
  exports: [ShoppingCartComponents, CartUserInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule {
}
