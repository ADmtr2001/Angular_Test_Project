import {Component, Input} from '@angular/core';

import {Dish} from "../../../../types/Dishes/Dish.interface";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent {
  @Input() dishes: ReadonlyArray<Dish> = [];
  @Input() isDishesLoading!: boolean;

  constructor() {
  }
}
