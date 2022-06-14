import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {DishesListComponent} from "./components/dishes-list/dishes-list.component";
import {CategoriesListComponent} from "./components/categories-list/categories-list.component";
import {OrdersListComponent} from "./components/orders-list/orders-list.component";

const routes: Routes = [
  {
    path: '', component: AdminPageComponent, children: [
      {path: 'user', component: UsersListComponent},
      {path: 'dish', component: DishesListComponent},
      {path: 'category', component: CategoriesListComponent},
      {path: 'order', component: OrdersListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
