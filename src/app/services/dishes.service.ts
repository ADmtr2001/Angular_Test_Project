import { Injectable } from '@angular/core';

import {BehaviorSubject, first} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";
import Dish from "../types/Dish";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  public dishes$: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>([]);
  public selectedDish$: BehaviorSubject<Dish> = new BehaviorSubject<Dish>({} as Dish);

  constructor(private http: HttpClient) {
  }

  public fetchDishes(): void {
    this.http.get<Dish[]>(`${environment.api_url}/dish`).pipe(first()).subscribe((dishes) => this.dishes$.next(dishes));
  }

  public setSelectedDish(dish: Dish): void {
    this.selectedDish$.next(dish);
  }
}
