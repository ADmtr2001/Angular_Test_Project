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
  DishModalContentComponent
} from "./components/dish-modal-content/dish-modal-content.component";
import {FormatSelectPipe} from "../../pipes/format-select.pipe";

const DishComponents = [
  DishesPageComponent,
  DishesListComponent,
  DishesItemComponent,
  FiltersComponent,
  DishModalContentComponent
];

@NgModule({
  declarations: [DishComponents, FormatSelectPipe],
  exports: [DishComponents],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DishModule {}
