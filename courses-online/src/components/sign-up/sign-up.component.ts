import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpUser } from '../../models/user.model';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)],
      ],
      email: ['', Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
    });
  }
  SaveUser() {
    const user: SignUpUser = this.signUpForm?.value as SignUpUser;
    console.log(user);
    this.authService.SignUp(user);
  }
}
