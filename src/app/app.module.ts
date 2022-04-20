import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from "@ngrx/store"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './mat.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from"@ngrx/effects"
import { httpIntercepProviders } from './interceptors/index';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    UsersModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([])
  ],
  providers: [httpIntercepProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
