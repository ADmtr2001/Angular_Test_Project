import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./services/auth-guard.service";
import {UnauthGuardService} from "./services/unauth-guard.service";


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule), canActivate: [AuthGuardService]},
  {path: 'shopping-cart', loadChildren: () => import('./modules/shopping-cart-module/shopping-cart.module').then((m) => m.ShoppingCartModule), canActivate: [AuthGuardService]},
  {path: 'auth', loadChildren: () => import('./modules/auth-module/auth.module').then((m) => m.AuthModule), canActivate: [UnauthGuardService]},
  {path: ':category', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule), canActivate: [AuthGuardService]},
];

// 2 services

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
