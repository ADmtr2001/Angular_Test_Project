import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthTokenHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(this.addAuthToken(httpRequest))
      .pipe(catchError((error) => {
      if (error.status === 500) this.authService.logout();

      return throwError('Not Authorized')
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
