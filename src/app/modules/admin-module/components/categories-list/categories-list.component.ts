import {Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {
  categoriesErrorSelector,
  categoriesSelector,
  isCategoriesLoadingSelector
} from "../../../../store/categories/categories.reducer";
import {deleteCategory, fetchCategories, updateCategory} from "../../../../store/categories/categories.actions";

import {Category} from "../../../../types/Dishes/Category.interface";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  public categories$: Observable<ReadonlyArray<Category>> = this.store.select(categoriesSelector);
  public isCategoriesLoading$: Observable<boolean> = this.store.select(isCategoriesLoadingSelector);
  public categoriesError$: Observable<string> = this.store.select(categoriesErrorSelector);

  public displayedColumns: string[] = ['position', 'name', 'id', 'actions'];

  constructor(
    private store: Store
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(fetchCategories());
  }

  public editItem(category: Category): void {
    const name = prompt('Enter new category name!');
    if (name) this.store.dispatch(updateCategory({categoryId: category._id, name}));
  }

  public deleteItem(category: Category): void {
    const isConfirmed = confirm(`Delete this category: ${category.name}?`);
    if (isConfirmed) this.store.dispatch(deleteCategory({categoryId: category._id}));
  }
}
