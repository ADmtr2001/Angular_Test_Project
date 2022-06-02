import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DishesPageComponent} from "./pages/dishes-page/dishes-page.component";
import {ShoppingCartPageComponent} from "./pages/shopping-cart-page/shopping-cart-page.component";

const routes: Routes = [
  { path: '', component: DishesPageComponent },
  { path: 'shopping-cart', component: ShoppingCartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
