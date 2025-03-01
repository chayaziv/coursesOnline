import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menue',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './menue.component.html',
  styleUrl: './menue.component.css',
})
export class MenueComponent implements OnInit {
  isAuth: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isAuth$.subscribe((auth) => {
      this.isAuth = auth;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
