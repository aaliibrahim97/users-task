import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
import { UnauthGuard } from './services/guards/unauth.guard';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  {
    path:'', 
    component:HomeComponent,
    canActivate:[UnauthGuard]
  },
  {
    path:'login', 
    component:LoginComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'signup', 
    component:SignupComponent,
    canActivate:[AuthGuard]},
  {
    path:"users",
    loadChildren: ()=> import ("../app/users/users.module").then(x => x.UsersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
