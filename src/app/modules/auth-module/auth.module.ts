import {NgModule} from "@angular/core";

import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "../material-module/material.module";

import {AuthPageComponent} from "./pages/auth-page/auth-page.component";

const AuthComponents = [
  AuthPageComponent
];

@NgModule({
  declarations: [AuthComponents],
  exports: [AuthComponents],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
