import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "../material-module/material.module";
import {FiltersComponent} from "./components/filters/filters.component";
import {ReactiveFormsModule} from "@angular/forms";

import {DishesPageComponent} from "./pages/dishes-page/dishes-page.component";
import {DishesListComponent} from "./components/dishes-list/dishes-list.component";
import {DishesItemComponent} from "./components/dishes-item/dishes-item.component";
import {
  SelectedDishModalContentComponent
} from "./components/selected-dish-modal-content/selected-dish-modal-content.component";

const DishComponents = [
  DishesPageComponent,
  DishesListComponent,
  DishesItemComponent,
  FiltersComponent,
  SelectedDishModalContentComponent
];

@NgModule({
  declarations: [DishComponents],
  exports: [DishComponents],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DishModule {}
