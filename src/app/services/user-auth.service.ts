import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  public loginURL: string = 'http://localhost:8000/users/login';
  public getPaginatedUsersURL =
    'http://localhost:8000/users/getAllPginatedUser';

  constructor(private http: HttpClient) {}

  userLogin(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(this.loginURL, data, { headers })
      .pipe(catchError(this.handleError));
  }

  getEmployees(page: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getPaginatedUsersURL}?page=${page}&limit=${limit}`
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
