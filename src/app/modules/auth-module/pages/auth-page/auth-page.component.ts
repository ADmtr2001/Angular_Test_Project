import {Component, OnInit} from '@angular/core';

import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public isSignUpForm = true;

  public email = new FormControl('');
  public password = new FormControl('');
  public passwordConfirm = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  public toggleForm(): void {
    this.isSignUpForm = !this.isSignUpForm;
  }
}
