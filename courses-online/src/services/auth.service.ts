import { Injectable } from '@angular/core';
import { SignInUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

//https://coursesserver-p3is.onrender.com
export class AuthService {
  private apiUrl = 'coursesserver-p3is.onrender.com/api/auth'; // או ה־URL המתאים לשרת שלך
  private userIdSubject = new BehaviorSubject<string | null>(null);
  public userId$ = this.userIdSubject.asObservable();
  private isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$ = this.isAuthSubject.asObservable();
  private roleSubject = new BehaviorSubject<string>('');
  public role$ = this.roleSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string>('Guest');
  public userName$ = this.userNameSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
   
  }

  SignIn(user: SignInUser) {
    
    const response = this.http.post<any>(`https://${this.apiUrl}/login`, { ...user });
    response.subscribe(
      (res) => {
   
        if (res.token) {
          sessionStorage.setItem('authToken', res.token);
          
        }
        this.userIdSubject.next(res.userId);
        this.roleSubject.next(res.role);
        this.isAuthSubject.next(true);
        this.userNameSubject.next(res.userName);
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Error:' + error.message);
        
      }
    );
  }

  SignUp(user: SignInUser) {
    const response = this.http.post<any>(`https://${this.apiUrl}/register`, {
      ...user,
    });
    response.subscribe(
      (res) => {
        if (res.token) {
          sessionStorage.setItem('authToken', res.token);
          
        }
        this.userIdSubject.next(res.userId);
        this.roleSubject.next(res.role);
        this.isAuthSubject.next(true);
        this.userNameSubject.next(res.userName);
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Error:' + error.message);
        
      }
    );
  }

  logout() {
    
    sessionStorage.removeItem('authToken');
    this.userIdSubject.next(null);
    this.isAuthSubject.next(false);
    this.roleSubject.next('');
    this.userNameSubject.next('Guest');
  }
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
