import { Component, OnInit } from '@angular/core';

import {DishesService} from "../../services/dishes.service";

import {IDish} from "../../types";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit {
  dishes: IDish[] = [];

  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {
    this.dishesService.getDishes().subscribe((dishes) => this.dishes = dishes);
  }
}
