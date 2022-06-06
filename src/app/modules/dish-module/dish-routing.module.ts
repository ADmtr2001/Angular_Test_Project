import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {DishesPageComponent} from "./pages/dishes-page/dishes-page.component";

const routes: Routes = [
  {path: '', component: DishesPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule {
}
