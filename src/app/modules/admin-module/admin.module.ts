import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material-module/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderModule} from "../loader-module/loader.module";
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { SectionSelectComponent } from './components/section-select/section-select.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DishesListComponent } from './components/dishes-list/dishes-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import {CustomPipesModule} from "../custom-pipes-module/custom-pipes.module";

@NgModule({
  declarations: [
    AdminPageComponent,
    SectionSelectComponent,
    UsersListComponent,
    DishesListComponent,
    CategoriesListComponent,
    OrdersListComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    LoaderModule,
    CustomPipesModule
  ]
})
export class AdminModule {
}
