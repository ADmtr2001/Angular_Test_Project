import {Component, OnDestroy, OnInit} from '@angular/core';

import {FormControl} from '@angular/forms';
import {DishesService} from "../../../../services/dishes.service";
import {first, Subscription} from "rxjs";
import {Category} from "../../../../types/Category";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  public searchQuery = new FormControl('');

  public categories: Category[] = [];

  public selectedCategory = new FormControl('');
  private selectedCategorySubscription!: Subscription;

  constructor(private dishesService: DishesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Как правильно сделать All категорию.
    this.dishesService.fetchCategories().pipe(first()).subscribe((categories) => this.categories = [{_id: '', name: 'All'}, ...categories]);

    this.selectedCategorySubscription = this.selectedCategory.valueChanges.subscribe((value) => {
       this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: value ? {category: value} : {category: null},
          queryParamsHandling: 'merge',
        });
    });
  }

  ngOnDestroy() {
    this.selectedCategorySubscription.unsubscribe();
  }
}
