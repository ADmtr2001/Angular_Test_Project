import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";

import {IDish} from "../types";

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  // private dishes-page: IDish[] = [];

  constructor(private http: HttpClient) { }

  getDishes() {
    return this.http.get<IDish[]>('http://localhost:5000/api/v1/dish');
  }
}
