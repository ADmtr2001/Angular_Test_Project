import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from "./modules/material-module/material.module";

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {AuthTokenHttpInterceptor} from "./interceptors/auth-token-http.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenHttpInterceptor, multi: true }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
