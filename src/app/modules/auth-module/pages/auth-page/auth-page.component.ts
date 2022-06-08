import {Component} from '@angular/core';

import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {createConfirmPasswordValidator} from "../../validators/confirmPasswordValidation";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public isSignUpForm = true;

  public registerForm: FormGroup = this.formBuilder.group({
    "name": ["", [Validators.required]],
    "email": ["", [Validators.required, Validators.email]],
    "password": ["", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]
    ],
    "passwordConfirm": [""],
  }, {
    validators: [createConfirmPasswordValidator()]
  });
  public get regNameControl(): AbstractControl | null {return this.registerForm.get('name')};
  public get regEmailControl(): AbstractControl | null {return this.registerForm.get('email')};
  public get regPasswordControl(): AbstractControl | null {return this.registerForm.get('password')};
  public get regPasswordConfControl(): AbstractControl | null {return this.registerForm.get('passwordConfirm')};

  public loginForm: FormGroup = this.formBuilder.group({
    "email": ["", [Validators.required, Validators.email]],
    "password": ["", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)]
    ]
  });
  public get logEmailControl(): AbstractControl | null {return this.loginForm.get('email')};
  public get logPasswordControl(): AbstractControl | null {return this.loginForm.get('password')};

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  public toggleForm(): void {
    this.isSignUpForm = !this.isSignUpForm;
  }

  public submitRegisterForm(): void {
    const {name, email, password} = this.registerForm.value;
    return this.authService.register({name, email, password});
  }

  public submitLoginForm(): void{
    this.authService.login(this.loginForm.value);
  }
}
