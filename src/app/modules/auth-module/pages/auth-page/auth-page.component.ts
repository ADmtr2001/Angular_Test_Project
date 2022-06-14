import {Component} from '@angular/core';

import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {createConfirmPasswordValidator} from "../../validators/confirmPasswordValidation";

import {Store} from "@ngrx/store";
import {
  isLoginSelector,
  isSignupSelector,
  loginErrorSelector,
  signupErrorSelector
} from "../../../../store/user/user.reducer";
import {login, register} from "../../../../store/user/user.actions";

import {Observable} from "rxjs";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public isSignUpForm = false;

  public isSignup$: Observable<boolean> = this.store.select(isSignupSelector);
  public signupError$: Observable<string> = this.store.select(signupErrorSelector);

  public isLogin$: Observable<boolean> = this.store.select(isLoginSelector);
  public loginError$: Observable<string> = this.store.select(loginErrorSelector);

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

  constructor(
    private formBuilder: FormBuilder,
    private store: Store) {
  }

  public toggleForm(): void {
    this.isSignUpForm = !this.isSignUpForm;
  }

  public submitRegisterForm(): void {
    const {name, email, password} = this.registerForm.value;
    const registerData = {name, email, password};
    this.store.dispatch(register({registerData}));
  }

  public submitLoginForm(): void{
    const loginData = this.loginForm.value;
    this.store.dispatch(login({loginData}));
  }
}
