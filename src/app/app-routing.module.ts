import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {UnauthGuardService} from "./services/unauth-guard.service";


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule), canActivate: [AuthGuard]},
  {path: 'shopping-cart', loadChildren: () => import('./modules/shopping-cart-module/shopping-cart.module').then((m) => m.ShoppingCartModule), canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./modules/auth-module/auth.module').then((m) => m.AuthModule), canActivate: [UnauthGuardService]},
  {path: ':category', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule), canActivate: [AuthGuard]},
];

// 2 services

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
