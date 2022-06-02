import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {DishesPageComponent} from "./modules/dish-module/pages/dishes-page/dishes-page.component";
import {ShoppingCartPageComponent} from "./modules/shopping-cart-module/pages/shopping-cart-page/shopping-cart-page.component";
import {AuthPageComponent} from "./modules/auth-module/pages/auth-page/auth-page.component";

const routes: Routes = [
  {path: '', component: DishesPageComponent},
  {path: 'shopping-cart', component: ShoppingCartPageComponent},
  {path: 'auth', component: AuthPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
