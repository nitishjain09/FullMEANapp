import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
ser
  userLoginStatus = false;

  //inject http client object
  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post("/user/createUser", userObj);
  }

  loginUser(credentials):Observable<any>{
    return this.hc.post("/user/login", credentials);
  }
  getUser(username){
    return this.hc.get(`/user/getUser/${username}`);
  }

  deleteUser(){

  }

  updateUser(){

  }
}
