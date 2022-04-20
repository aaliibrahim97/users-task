import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from "./ip.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  doRegist(
    name:string,
    email:string,
    password:string)
  {
    return this.http.post(API().registration,{
      name:name,
      email:email,
      password:password
    })   
  }

  doLogIn(
    email:string,
    password:string)
  {
     return this.http.post(API().login,{
       email:email,
       password:password
     })
  }

  isLogged() {
    let token = localStorage.getItem('token')
    if(token) {
      return true
    }
    else {
      return false
    }
  }

}
