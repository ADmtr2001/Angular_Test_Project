import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

import {DishesService} from "../../../../services/dishes.service";

import {Dish} from "../../../../types/Dish";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit {
  public dishes$: BehaviorSubject<Dish[]>;

  constructor(private dishesService: DishesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.dishes$ = this.dishesService.dishes$;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(res=>{
      this.dishesService.fetchDishes(res);
    })
  }
}
