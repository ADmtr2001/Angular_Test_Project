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

  constructor(private http: HttpClient) {
  }

  public fetchDishes(): void {
    this.http.get<IDish[]>(`${environment.api_url}/dish`).pipe(first()).subscribe((dishes) => this.dishes$.next(dishes));
  }
}
