import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:9090/user';
  private token: string | null | undefined;
  private loggedInEmail: string | null | undefined;
  private jwtHelperSerive = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getUsers(headers: HttpHeaders): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/list`, { headers });
  }

  login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.baseUrl}/login`, user, { observe: 'response' });
  }

  logout() {
    this.token = null;
    this.loggedInEmail = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  saveToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  addUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  loadToken() {
    this.token = localStorage.getItem('token');
  }

  getToken(): string {
    return this.token!;
  }

  isLoggedInUser(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== '') {
      if(this.jwtHelperSerive.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelperSerive.isTokenExpired(this.token)) {
          this.loggedInEmail = this.jwtHelperSerive.decodeToken(this.token).sub;
          return true;
        }
      }
    }
    this.logout();
    return false;
  }

  addUser(formData: FormData, headers: HttpHeaders): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add`, formData, { headers });
  }

  updateUser(formData: FormData, headers: HttpHeaders): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/update`, formData, { headers });
  }

  sendResetPasswordEmail(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/resetPassword`, formData);
  }

  resetPassword(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/resetPassword`, formData);
  }

  deleteUser(id: number, headers: HttpHeaders): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/delete/${id}`, { headers });
  }
}
