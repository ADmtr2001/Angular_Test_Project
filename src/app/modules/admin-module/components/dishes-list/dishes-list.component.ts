import { Component, OnInit } from '@angular/core';

import {Observable} from "rxjs";
import {DishesService} from "../../../../services/dishes.service";

import {Store} from "@ngrx/store";
import {dishesErrorSelector, dishesSelector, isDishesLoadingSelector} from "../../../../store/dishes/dishes.reducer";
import {
  categoriesErrorSelector,
  categoriesSelector,
  isCategoriesLoadingSelector
} from "../../../../store/categories/categories.reducer";
import {fetchDishes, setSelectedDish} from "../../../../store/dishes/dishes.actions";
import {fetchCategories} from "../../../../store/categories/categories.actions";

import {DishModalContentComponent} from "../../../../shared/dish-modal-content/dish-modal-content.component";

import {Category} from "../../../../types/Dishes/Category.interface";
import {Dish} from "../../../../types/Dishes/Dish.interface";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss'],
})
export class DishesListComponent implements OnInit {
  public dishes$: Observable<ReadonlyArray<Dish>> = this.store.select(dishesSelector);
  public isDishesLoading$: Observable<boolean> = this.store.select(isDishesLoadingSelector);
  public dishesError$: Observable<string> = this.store.select(dishesErrorSelector);

  public categories$: Observable<ReadonlyArray<Category>> = this.store.select(categoriesSelector);
  public isCategoriesLoading$: Observable<boolean> = this.store.select(isCategoriesLoadingSelector);
  public categoriesError$: Observable<string> = this.store.select(categoriesErrorSelector);

  public displayedColumns: string[] = ['position', 'name', 'price', 'category', 'id'];

  constructor(
    private store: Store,
    private dishesService: DishesService,
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(fetchDishes({queryParams: {}}));
    this.store.dispatch(fetchCategories());
  }

  public openDialog(dish: Dish): void {
    this.store.dispatch(setSelectedDish({dish}));
    this.dishesService.openDishDialog(DishModalContentComponent);
  }
}
