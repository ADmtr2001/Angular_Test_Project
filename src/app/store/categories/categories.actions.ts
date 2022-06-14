import {createAction, props} from "@ngrx/store";
import {Category} from "../../types/Dishes/Category.interface";

export const fetchCategories = createAction('[Categories] Fetch Categories');
export const fetchCategoriesSuccess = createAction('[Categories] Fetch Categories Success', props<{categories: Category[]}>());
export const fetchCategoriesError = createAction('[Categories] Fetch Categories Error', props<{errorMessage: string}>());

export const deleteCategory = createAction('[Categories] Delete Category', props<{categoryId: string}>());
export const deleteCategorySuccess = createAction('[Categories] Delete Category Success', props<{deletedCategory: Category}>());
export const deleteCategoryError = createAction('[Categories] Delete Category Error', props<{errorMessage: string}>());

export const updateCategory = createAction('[Categories] Update Category', props<{categoryId: string, name: string}>());
export const updateCategorySuccess = createAction('[Categories] Update Category Success', props<{newCategory: Category}>());
export const updateCategoryError = createAction('[Categories] Update Category Error', props<{errorMessage: string}>());
