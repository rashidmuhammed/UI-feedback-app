import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');

    const authReq = accessToken
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        })
      : req;

    this.loaderService.show();

    return next.handle(authReq).pipe(
      tap(() => {
        this.loaderService.hide();
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();

        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          localStorage.clear();
          this.router.navigate(['/login']);
          console.error('Access forbidden: ', error.message);
        } else {
          localStorage.clear();
          this.router.navigate(['/login']);
          console.error('An error occurred:', error.message);
        }

        return throwError(() => error);
      })
    );
  }
}
