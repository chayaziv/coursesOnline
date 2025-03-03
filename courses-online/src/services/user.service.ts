import { Injectable, OnInit } from '@angular/core';
import { Sign } from 'crypto';
import { emptyUser, SignInUser, SignUpUser, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private currentUserSubject = new BehaviorSubject<User>(emptyUser); // Subject להחזיק את פרטי המשתמש
  public currentUser$: Observable<User> =
    this.currentUserSubject.asObservable(); // Observable שיאפשר להאזין לשינויים

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getUserById(userId: string) {
    this.http.get<User>(`${this.apiUrl}/${userId}`).subscribe((user) => {
      this.currentUserSubject.next(user);
    });
  }
}
