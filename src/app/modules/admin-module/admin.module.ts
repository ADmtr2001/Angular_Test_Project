import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "../material-module/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderModule} from "../loader-module/loader.module";
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
  declarations: [
    AdminPageComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    LoaderModule
  ]
})
export class AdminModule {
}
