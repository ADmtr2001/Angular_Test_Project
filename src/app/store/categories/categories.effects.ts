import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, exhaustMap, map, mergeMap, tap} from 'rxjs/operators';
import {catchError, of} from "rxjs";
import {CategoriesService} from "../../services/categories.service";
import {
  deleteCategory,
  deleteCategoryError,
  deleteCategorySuccess,
  fetchCategories,
  fetchCategoriesError,
  fetchCategoriesSuccess, updateCategory, updateCategoryError, updateCategorySuccess
} from "./categories.actions";

@Injectable()
export class CategoriesEffects {
  fetchCategories$ = createEffect(() => this.actions$.pipe(
    ofType(fetchCategories),
    mergeMap((action) => this.categoriesService.fetchCategories()),
    map((categories) => fetchCategoriesSuccess({categories: [{_id: '', name: 'All'}, ...categories]})),
    catchError((errorMessage) => of(fetchCategoriesError({errorMessage}))),
  ));

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType(deleteCategory),
    concatMap((action) => this.categoriesService.deleteCategory(action.categoryId)),
    map((deletedCategory) => deleteCategorySuccess({deletedCategory})),
    catchError((errorMessage) => of(deleteCategoryError({errorMessage})))
  ));

  updateCategory$ = createEffect(() => this.actions$.pipe(
    ofType(updateCategory),
    concatMap((action) => this.categoriesService.updateCategory(action.categoryId, action.name)),
    map((newCategory) => updateCategorySuccess({newCategory})),
    catchError((errorMessage) => of(updateCategoryError({errorMessage})))
  ));

  constructor(private actions$: Actions, private categoriesService: CategoriesService) {
  }
}
