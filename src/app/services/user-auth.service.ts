import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../models/user';
import { catchError, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  public loginURL: string = 'http://localhost:8000/users/login';
  public getPaginatedUsersURL =
    'http://localhost:8000/users/getAllPginatedUser';

  public updateUserURL = 'http://localhost:8000/users/updateUser';
  public registerUserURL = 'http://localhost:8000/users/register';
  public deleteUserURL = 'http://localhost:8000/users/delteUser';
  public getAllUsersURL = 'http://localhost:8000/users/getAllusers';
  public assignmentURL = 'http://localhost:8000/tasks/assigments';
  //URL For When a normal user is logged in, if they have any assignments, they will receive the ID of the employee for whom they need to enter feedback
  public getassignedUserIdURL =
    'http://localhost:8000/tasks/getTaskForLoggedUser';

  constructor(private http: HttpClient, private route: Router) {}

  userLogin(data: any): Observable<any> {
    return this.http
      .post(this.loginURL, data)
      .pipe(catchError(this.handleError));
  }

  getEmployees(page: number, limit: number): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.getPaginatedUsersURL}?page=${page}&limit=${limit}`
    );
  }

  updateUser(data: User, id: string): Observable<any> {
    return this.http.put<any>(`${this.updateUserURL}?id=${id}`, data);
  }

  createUser(data: User): Observable<User[]> {
    return this.http.post<User[]>(this.registerUserURL, data);
  }

  getCurrentUserRole() {
    let userRole = '';
    let user: any;
    let helper = new JwtHelperService();
    let token = localStorage.getItem('accessToken');

    if (token) {
      let decodedToken = helper.decodeToken(token);
      console.log(decodedToken?.user);
      user = decodedToken?.user;
      userRole = user.role;
    }

    return userRole;
  }
  getCurrentUserId() {
    let userId = '';
    let user: any;
    let helper = new JwtHelperService();
    let token = localStorage.getItem('accessToken');

    if (token) {
      let decodedToken = helper.decodeToken(token);
      console.log(decodedToken?.user);
      user = decodedToken?.user;
      userId = user.id;
    }

    return userId;
  }

  getAllusers(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUsersURL);
  }

  assignEmployees(adminId: string, assignedTo: string, employees: string[]) {
    const body = {
      adminId,
      assignedTo,
      employees,
    };
    return this.http.post(this.assignmentURL, body);
  }

  fetchEmployeeFeedbackId(id: string): Observable<any> {
    let body = {
      employeeId: id,
    };
    return this.http.post<any>(this.getassignedUserIdURL, body);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/users/${id}`);
  }

  userLogout() {
    this.route.navigate(['/login']);
    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
