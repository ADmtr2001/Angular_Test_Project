import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Category} from "../types/Dishes/Category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(
    private http: HttpClient) {
  }

  public fetchCategories(): Observable<Category[]> {
    const url = `${environment.api_url}/category`;
    return this.http.get<Category[]>(url);
  }

  public deleteCategory(categoryId: string): Observable<Category> {
    const url = `${environment.api_url}/category/${categoryId}`;
    return this.http.delete<Category>(url);
  }

  public updateCategory(categoryId: string, name: string): Observable<Category> {
    const url = `${environment.api_url}/category/${categoryId}`;
    return this.http.patch<Category>(url, {name});
  }
}
