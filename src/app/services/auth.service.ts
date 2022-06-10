import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {AuthResponse} from "../types/Auth/AuthResponse.interface";
import {RegisterData} from "../types/Auth/RegisterData.interface";
import {LoginData} from "../types/Auth/LoginData.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public register(registerData: RegisterData): Observable<AuthResponse> {
    const url = `${environment.api_url}/user/register`;
    return this.http.post<AuthResponse>(url, registerData,{withCredentials: true});
  }

  public login(loginData: LoginData): Observable<AuthResponse> {
    const url = `${environment.api_url}/user/login`;
    return this.http.post<AuthResponse>(url, loginData, {withCredentials: true});
  }

  public logout(): Observable<void> {
    const url = `${environment.api_url}/user/logout`;
    return this.http.post<void>(url, null, {withCredentials: true});
  }

  public checkAuth(): Observable<AuthResponse> {
    const url = `${environment.api_url}/user/refresh`;
    return this.http.post<AuthResponse>(url, null, {withCredentials: true});
  }
}
