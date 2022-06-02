import {Component, OnInit} from '@angular/core';

import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  isSignUpForm = true;

  email = new FormControl('');
  password = new FormControl('');
  passwordConfirm = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  toggleForm() {
    this.isSignUpForm = !this.isSignUpForm;
  }
}
