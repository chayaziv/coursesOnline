import { Injectable } from '@angular/core';
import { SignInUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // או ה־URL המתאים לשרת שלך
  private userIdSubject = new BehaviorSubject<string | null>(null);
  public userId$ = this.userIdSubject.asObservable();
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$ = this.isAuthSubject.asObservable();
  private roleSubject = new BehaviorSubject<string>('');
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  // התחברות
  SignIn(user: SignInUser) {
    const response = this.http.post<any>(`${this.apiUrl}/login`, { ...user });
    response.subscribe(
      (res) => {
        if (res.token) {
          sessionStorage.setItem('authToken', res.token);
          console.log('Token:', res.token);
        }
        this.userIdSubject.next(res.userId);
        this.roleSubject.next(res.role);
        this.isAuthSubject.next(true);
      },
      (error) => {
        console.error('Error:', error.message);
      }
    );
  }

  SignUp(user: SignInUser) {
    const response = this.http.post<any>(`${this.apiUrl}/register`, {
      ...user,
    });
    response.subscribe(
      (res) => {
        if (res.token) {
          sessionStorage.setItem('authToken', res.token);
          console.log('Token:', res.token);
        }
        this.userIdSubject.next(res.userId);
        this.roleSubject.next(res.role);
        this.isAuthSubject.next(true);
      },
      (error) => {
        console.error('Error:', error.message);
      }
    );
  }

  // פונקציה למחוק את ה־token (logout)
  logout() {
    console.log('logout');
    sessionStorage.removeItem('authToken');
    this.userIdSubject.next(null);
    this.isAuthSubject.next(false);
    this.roleSubject.next('');

  }
  // פונקציה לקבלת ה־token
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
