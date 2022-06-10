import {Component, OnDestroy, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {DishesService} from "../../../../services/dishes.service";
import {first, Observable, Subject, takeUntil} from "rxjs";

import {Store} from "@ngrx/store";
import {categoriesSelector, dishesSelector, isDishesLoadingSelector} from "../../../../store/dishes/dishes.reducer";
import {fetchCategories, fetchDishes} from "../../../../store/dishes/dishes.actions";

import {Category} from "../../../../types/Dishes/Category.interface";
import {Dish} from "../../../../types/Dishes/Dish.interface";

@Component({
  selector: 'app-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.scss']
})
export class DishesPageComponent implements OnInit, OnDestroy {
  public categories$: Observable<readonly Category[]> = this.store.select(categoriesSelector);
  public currentCategoryValue: string = '';

  public dishes$: Observable<readonly Dish[]> = this.store.select(dishesSelector);
  public isDishesLoading$: Observable<boolean> = this.store.select(isDishesLoadingSelector);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dishesService: DishesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(fetchCategories());

    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        this.currentCategoryValue = category['category'] || '';
        this.store.dispatch(fetchDishes({queryParams: category}));
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onCategoryChange(category: string): void {
    this.router.navigate([category]);
  }
}
