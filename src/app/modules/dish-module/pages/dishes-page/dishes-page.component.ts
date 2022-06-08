import {Component, OnDestroy, OnInit} from '@angular/core';
import {DishesService} from "../../../../services/dishes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, first, Observable, Subject, takeUntil, tap} from "rxjs";
import {Category} from "../../../../types/Dishes/Category";
import {Dish} from "../../../../types/Dishes/Dish";

@Component({
  selector: 'app-dishes-page',
  templateUrl: './dishes-page.component.html',
  styleUrls: ['./dishes-page.component.scss']
})
export class DishesPageComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  public currentCategoryValue: string = '';

  public dishes$: Observable<Dish[]>;
  public isDishesLoading$: Observable<boolean>;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dishesService: DishesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.dishes$ = this.dishesService.dishes$;
    this.isDishesLoading$ = this.dishesService.isDishesLoading$;
  }

  public ngOnInit(): void {
    this.dishesService
      .fetchCategories()
      .pipe(first())
      .subscribe((categories) => this.categories = [{_id: '', name: 'All'}, ...categories]);

    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((category) => {
      this.currentCategoryValue = category['category'] || '';
      this.dishesService.fetchDishes(category);
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
