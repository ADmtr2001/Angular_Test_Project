import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {UnauthGuard} from "./guards/unauth.guard";
import {AdminGuard} from "./guards/admin.guard";


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule), canActivate: [AuthGuard]},
  {path: 'shopping-cart', loadChildren: () => import('./modules/shopping-cart-module/shopping-cart.module').then((m) => m.ShoppingCartModule), canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./modules/auth-module/auth.module').then((m) => m.AuthModule), canActivate: [UnauthGuard]},
  {path: 'admin', loadChildren: () => import('./modules/admin-module/admin.module').then((m) => m.AdminModule), canActivate: [AdminGuard]},
  {path: ':category', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
