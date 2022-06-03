import { Component, OnInit } from '@angular/core';

import {BehaviorSubject} from "rxjs";
import {DishesService} from "../../../../services/dishes.service";

import {IDish} from "../../../../types";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
  // providers: [DishesService] Check Info About
})
export class DishesListComponent implements OnInit {
  dishes$: BehaviorSubject<IDish[]>;

  constructor(private dishesService: DishesService) {
    this.dishes$ = this.dishesService.dishes$;
  }

  ngOnInit(): void {
    this.dishesService.fetchDishes();
  }
}
