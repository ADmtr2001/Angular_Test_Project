import { Injectable } from '@angular/core';

import {BehaviorSubject, first} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";

import {Dish} from "../types";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  public dishes$: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>([]);
  // Насколько правильно указаны типы
  public selectedDish$: BehaviorSubject<Dish | null> = new BehaviorSubject<Dish | null>(null);

  constructor(private http: HttpClient) {
  }

  public fetchDishes(): void {
    this.http.get<Dish[]>(`${environment.api_url}/dish`).pipe(first()).subscribe((dishes) => this.dishes$.next(dishes));
  }

  public setSelectedDish(dish: Dish | null): void {
    this.selectedDish$.next(dish);
  }
}
