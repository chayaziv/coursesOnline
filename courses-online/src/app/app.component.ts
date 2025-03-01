import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { MenueComponent } from "../components/menue/menue.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenueComponent, SignInComponent, SignUpComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'courses-online';
}

