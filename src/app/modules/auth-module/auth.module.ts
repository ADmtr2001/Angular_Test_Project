import {NgModule} from "@angular/core";

import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material-module/material.module";

import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {AuthRoutingModule} from "./auth-routing.module";

const AuthComponents = [
  AuthPageComponent
];

@NgModule({
  declarations: [AuthComponents],
  exports: [AuthComponents],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
