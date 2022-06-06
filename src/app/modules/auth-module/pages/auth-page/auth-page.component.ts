import {Component} from '@angular/core';

import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public isSignUpForm = true;

  // 2 different forms with ng-template
  public email = new FormControl('');
  public password = new FormControl('');
  public passwordConfirm = new FormControl('');

  constructor() { }

  public toggleForm(): void {
    this.isSignUpForm = !this.isSignUpForm;
  }
}
