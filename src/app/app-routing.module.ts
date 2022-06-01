import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DishesComponent} from "./pages/dishes/dishes.component";

const routes: Routes = [
  { path: '', component: DishesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
