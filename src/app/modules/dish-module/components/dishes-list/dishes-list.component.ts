import { Component, OnInit } from '@angular/core';

import {BehaviorSubject} from "rxjs";
import {DishesService} from "../../../../services/dishes.service";
import Dish from "../../../../types/Dish";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit {
  public dishes$: BehaviorSubject<Dish[]>;

  constructor(private dishesService: DishesService) {
    this.dishes$ = this.dishesService.dishes$;
  }

  ngOnInit(): void {
    this.dishesService.fetchDishes();
  }
}
