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

  private userId: string = '';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.userId$.subscribe((id) => {
      this.userId = id!;
    });
    this.authService.isAuth$.subscribe((isAuth) => {
     
      if (isAuth) {
        this.getUserById();
      } else {
        this.currentUserSubject.next(emptyUser);
      }
    });
    
  }

  public getUserById() {
    

    this.http.get<User>(`${this.apiUrl}/${this.userId}`).subscribe((user) => {
      this.currentUserSubject.next(user);
    });
  }
}
