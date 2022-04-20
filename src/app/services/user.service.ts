import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';
import { User } from '../interfaces/user';
import { API } from "./ip.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  token!:string

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token') as string

   }

  getUsers(page:number):Observable<User[]> {

    return this.http.get<User[]>(API().userData, {
      
      params:{page: page}
    
    });
  
  }

  createUser(payload: Data): Observable<Data> {
  
    return this.http.post<Data>(API().createUser, payload);
  
  }

  updateUser(user: Data): Observable<Data> {

    return this.http.put<Data>(API(user.id).updateUser,user);

  }

  deleteUser(id:string | undefined): Observable<Data> {

    return this.http.delete<any>(API(id).deleteUser);
    
  }

}
