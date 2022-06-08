import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material-module/material.module";
import {FiltersComponent} from "./components/filters/filters.component";
import {ReactiveFormsModule} from "@angular/forms";

import {DishesPageComponent} from "./pages/dishes-page/dishes-page.component";
import {DishesListComponent} from "./components/dishes-list/dishes-list.component";
import {DishesItemComponent} from "./components/dishes-item/dishes-item.component";
import {
  DishModalContentComponent
} from "../../shared/dish-modal-content/dish-modal-content.component";
import {FormatSelectPipe} from "../../pipes/format-select.pipe";
import {DishRoutingModule} from "./dish-routing.module";
import {LoaderComponent} from "./components/loader/loader.component";

const DishComponents = [
  DishesPageComponent,
  DishesListComponent,
  DishesItemComponent,
  FiltersComponent,
  DishModalContentComponent,
  FormatSelectPipe,
  LoaderComponent
];

@NgModule({
  declarations: [DishComponents],
  exports: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DishRoutingModule
  ]
})
export class DishModule {}
