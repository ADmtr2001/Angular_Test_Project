import { Component, OnInit } from '@angular/core';

import {FormControl} from '@angular/forms';
import {DishesService} from "../../../../services/dishes.service";
import {first} from "rxjs";
import {Category} from "../../../../types/Category";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public searchQuery = new FormControl('');

  public categories: Category[] = [];

  public selectedCategory = new FormControl('');

  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {
    this.dishesService.fetchCategories().pipe(first()).subscribe((categories) => this.categories = categories);
  }
}
