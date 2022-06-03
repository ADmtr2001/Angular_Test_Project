import { Injectable } from '@angular/core';

import {BehaviorSubject, first} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";

import {IDish} from "../types";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  public dishes$: BehaviorSubject<IDish[]> = new BehaviorSubject<IDish[]>([]);
  // Насколько правильно указаны типы
  public selectedDish$: BehaviorSubject<IDish | null> = new BehaviorSubject<IDish | null>(null);

  constructor(private http: HttpClient) {
  }

  public fetchDishes(): void {
    this.http.get<IDish[]>(`${environment.api_url}/dish`).pipe(first()).subscribe((dishes) => this.dishes$.next(dishes));
  }

  public setSelectedDish(dish: IDish | null): void {
    this.selectedDish$.next(dish);
  }

  // public getSelectedDish(): IDish | null {
  //   return this.selectedDish;
  // }
  //
  // public setSelectedDish(dish: IDish | null): void {
  //   this.selectedDish = dish;
  // }
}
