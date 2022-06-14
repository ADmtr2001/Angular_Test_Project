import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";

import {Category} from "../../types/Dishes/Category.interface";

import {
  deleteCategoryError,
  deleteCategorySuccess,
  fetchCategories,
  fetchCategoriesError,
  fetchCategoriesSuccess, updateCategoryError, updateCategorySuccess
} from "./categories.actions";

export interface CategoriesState {
  categories: ReadonlyArray<Category>;
  isCategoriesLoading: boolean;
  categoriesError: string;
  categoryDeleteError: string;
  categoryUpdateError: string;
}

export const initialState: CategoriesState = {
  categories: [],
  isCategoriesLoading: false,
  categoriesError: '',
  categoryDeleteError: '',
  categoryUpdateError: '',
};

const updateCategories = (categories: ReadonlyArray<Category>, newCategory: Category) : ReadonlyArray<Category> => {
  return categories.map((category) => {
    if (category._id === newCategory._id) return newCategory;
    return category;
  });
}

export const categoriesReducer = createReducer(
  initialState,
  on(fetchCategories, (state) => {
    return {...state, isCategoriesLoading: true, categoriesError: ''}
  }),
  on(fetchCategoriesSuccess, (state, {categories}) => {
    return {...state, categories, isCategoriesLoading: false, categoriesError: ''}
  }),
  on(fetchCategoriesError, (state, {errorMessage}) => {
    return {...state, isCategoriesLoading: false, categoriesError: errorMessage}
  }),
  on(deleteCategorySuccess, (state, {deletedCategory}) => {
    return {...state, categories: state.categories.filter((category) => category._id !== deletedCategory._id), categoryDeleteError: ''}
  }),
  on(deleteCategoryError, (state, {errorMessage}) => {
    return {...state, categoryDeleteError: errorMessage}
  }),
  on(updateCategorySuccess, (state, {newCategory}) => {
    return {...state, categories: updateCategories(state.categories, newCategory), categoryDeleteError: ''}
  }),
  on(updateCategoryError, (state, {errorMessage}) => {
    return {...state, categoryDeleteError: errorMessage}
  }),
);

export const categoriesFeatureSelector = createFeatureSelector<CategoriesState>('categories');

export const categoriesSelector = createSelector(categoriesFeatureSelector, (state) => state.categories);
export const isCategoriesLoadingSelector = createSelector(categoriesFeatureSelector, (state) => state.isCategoriesLoading);
export const categoriesErrorSelector = createSelector(categoriesFeatureSelector, (state) => state.categoriesError);
