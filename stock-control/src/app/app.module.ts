import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast'
import {InputTextModule} from 'primeng/inputtext'
import {ButtonModule} from 'primeng/button'

import {CookieService} from 'ngx-cookie-service'

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,

    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
