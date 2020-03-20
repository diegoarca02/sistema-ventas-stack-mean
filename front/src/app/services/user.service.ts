import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GLOBAL } from "./GLOBAL";
import { User } from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class UserService {  

  public url;
  public user;
  public token;
  public identity;

  constructor(
    private _http : HttpClient,
  ) { 
    this.url = GLOBAL.url;
    this.user = new User('','','','','');
  }

  login(user,getToken = null):Observable<any>{
    let json = user;

    if(getToken != null){
      user.gettoken = true;
    }

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'login',json,{headers:headers})
  }

  getToken():Observable<any>{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity():Observable<any>{
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  get_users():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'usuarios',{headers:headers});
  }

  registrar(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'registrar',data,{headers:headers});
  }

  get_user(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'user/'+id,{headers:headers});
  }

  editar(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'user/editar/'+data._id,data,{headers:headers});
  }

}
