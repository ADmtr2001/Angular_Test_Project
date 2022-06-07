import {Injectable} from '@angular/core';
import {BehaviorSubject, first, Observable} from "rxjs";
import {User} from "../types/User";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthResponse} from "../types/AuthResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  // loading???

  constructor(private http: HttpClient, private router: Router) {
  }

  public register(registerData: {name:string, email: string, password: string}): void {
    const url = `${environment.api_url}/user/register`;
    this.http
      .post<AuthResponse>(
        url,
        registerData,
        {withCredentials: true})
      .pipe(first())
      .subscribe((data) => {
        this.setUser(data);
        this.router.navigate(['']);
      });
  }


  public login(loginData: {email: string, password: string}): void {
    this.http
      .post<AuthResponse>(
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
        this.user$.next(null);
        this.router.navigate(['auth']);
      });
  }

  public checkAuth(): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        `${environment.api_url}/user/refresh`,
        null,
        {withCredentials: true});

    // this.http
    //   .post<AuthResponse>(
    //     `${environment.api_url}/user/refresh`,
    //     null,
    //     {withCredentials: true})
    //   .pipe(first())
    //   .subscribe((data) => {
    //     this.setUser(data);
    //     this.router.navigate(['']);
    //   });
  }

  public setUser(data: AuthResponse): void {
    localStorage.setItem("token", data.accessToken);
    this.user$.next(data.user);
  }
}
