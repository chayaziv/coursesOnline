import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ButtonStyleDirective } from '../../directives/button-style.directive';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatDialogModule,
    ButtonStyleDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userName: string = 'Guest';
  constructor(public userService: UserService) {}
  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.userName = user.name;
    });
  }
}
