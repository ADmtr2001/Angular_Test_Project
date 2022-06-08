import {Injectable} from '@angular/core';
import {BehaviorSubject, first, Observable} from "rxjs";
import {User} from "../types/Auth/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthResponseInterface} from "../types/Auth/AuthResponse.interface";
import {Router} from "@angular/router";
import {RegisterData} from "../types/Auth/RegisterData";
import {LoginData} from "../types/Auth/LoginData";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubj$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubj$.asObservable();
  // loading

  constructor(private http: HttpClient, private router: Router) {
  }

  public register(registerData: RegisterData): void {
    const url = `${environment.api_url}/user/register`;
    this.http
      .post<AuthResponseInterface>(
        url,
        registerData,
        {withCredentials: true})
      .pipe(first())
      .subscribe((data) => {
        this.setUser(data);
        this.router.navigate(['']);
      });
  }


  public login(loginData: LoginData): void {
    this.http
      .post<AuthResponseInterface>(
        `${environment.api_url}/user/login`,
        loginData,
        {withCredentials: true})
      .pipe(first())
      .subscribe((data) => {
        this.setUser(data);
        this.router.navigate(['']);
      });
  }

  public logout(): void {
    this.http
      .post<void>(
        `${environment.api_url}/user/logout`,
        null,
        {withCredentials: true})
      .pipe(first())
      .subscribe((data) => {
        localStorage.removeItem("token");
        this.userSubj$.next(null);
        this.router.navigate(['auth']);
      });
  }

  public checkAuth(): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        `${environment.api_url}/user/refresh`,
        null,
        {withCredentials: true});

    // this.http
    //   .post<AuthResponseInterface>(
    //     `${environment.api_url}/user/refresh`,
    //     null,
    //     {withCredentials: true})
    //   .pipe(first())
    //   .subscribe((data) => {
    //     this.setUser(data);
    //     this.router.navigate(['']);
    //   });
  }

  public setUser(data: AuthResponseInterface): void {
    localStorage.setItem("token", data.accessToken);
    this.userSubj$.next(data.user);
  }
}
