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
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {reducers} from "./store";
import {OrderEffects} from "./store/order/order.effects";
import {DishesEffects} from "./store/dishes/dishes.effects";
import {UserEffects} from "./store/user/user.effects";
import {LoaderModule} from "./modules/loader-module/loader.module";
import {CategoriesEffects} from "./store/categories/categories.effects";
import { OrderModalContentComponent } from './shared/order-modal-content/order-modal-content.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    OrderModalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LoaderModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([OrderEffects, DishesEffects, UserEffects, CategoriesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
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

