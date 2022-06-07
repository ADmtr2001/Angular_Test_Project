import {Injectable} from '@angular/core';
import {Params} from "@angular/router";

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, first, Observable} from "rxjs";

import {Category} from "../types/Category";
import {Dish} from "../types/Dish";
import {environment} from "../../environments/environment";
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private dishesSubj$: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>([]);
  public dishes$: Observable<Dish[]> = this.dishesSubj$.asObservable();
  public selectedDish$: BehaviorSubject<Dish> = new BehaviorSubject<Dish>({} as Dish);
  // isLoading

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  public fetchDishes(queryParams: Params): void {
    this.http
      .get<Dish[]>(`${environment.api_url}/dish`, {params: queryParams})
      .pipe(first())
      .subscribe((dishes) => this.dishesSubj$.next(dishes));
  }

  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api_url}/category`);
  }

  public openDishDialog<T>(component: ComponentType<T>, dish: Dish): void {
    this.selectedDish$.next(dish);
    this.dialog.open(component, {
      width: '80rem',
    });
  }
}
