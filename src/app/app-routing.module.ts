import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule)},
  {path: 'shopping-cart', loadChildren: () => import('./modules/shopping-cart-module/shopping-cart.module').then((m) => m.ShoppingCartModule)},
  {path: 'auth', loadChildren: () => import('./modules/auth-module/auth.module').then((m) => m.AuthModule)},
  {path: ':category', loadChildren: () => import('./modules/dish-module/dish.module').then((m) => m.DishModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
