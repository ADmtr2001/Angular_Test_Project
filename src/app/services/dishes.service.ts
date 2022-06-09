import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {Params} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

import {Category} from "../types/Dishes/Category.interface";
import {Dish} from "../types/Dishes/Dish.interface";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  public fetchDishes(queryParams: Params): Observable<Dish[]> {
    const url = `${environment.api_url}/dish`;
    return this.http.get<Dish[]>(url, {params: queryParams});
  }

  public fetchCategories(): Observable<Category[]> {
    const url = `${environment.api_url}/category`;
    return this.http.get<Category[]>(url);
  }

  public openDishDialog<T>(component: ComponentType<T>): void {
    this.dialog.open(component, {width: '80rem',});
  }
}
