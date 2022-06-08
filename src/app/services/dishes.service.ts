import {Injectable} from '@angular/core';
import {Params} from "@angular/router";

import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, first, Observable} from "rxjs";

import {Category} from "../types/Dishes/Category";
import {Dish} from "../types/Dishes/Dish";
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
  public isDishesLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  public fetchDishes(queryParams: Params): void {
    this.isDishesLoading$.next(true);
    this.http
      .get<Dish[]>(`${environment.api_url}/dish`, {params: queryParams})
      .pipe(first())
      .subscribe({
        next: (dishes) => this.dishesSubj$.next(dishes),
        complete: () => this.isDishesLoading$.next(false)
      });
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
