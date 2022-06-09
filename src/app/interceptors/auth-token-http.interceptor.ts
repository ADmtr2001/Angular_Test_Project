import {Injectable} from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

import {Store} from "@ngrx/store";
import {logout} from "../store/user/user.actions";

@Injectable()
export class AuthTokenHttpInterceptor implements HttpInterceptor {

  constructor(private store: Store) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 401
    return next
      .handle(this.addAuthToken(httpRequest))
      .pipe(catchError((error) => {
      if (error.status === 500) this.store.dispatch(logout());

      return throwError(() => 'Not Authorized')
    }));
  }

  addAuthToken(request: HttpRequest<any>) {
    const accessToken = localStorage.getItem('token');

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
