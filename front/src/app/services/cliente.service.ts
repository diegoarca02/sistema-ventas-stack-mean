import { Injectable } from '@angular/core';
import { GLOBAL } from "./GLOBAL";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(
    private _http : HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  get_clientes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'clientes',{headers:headers});
  }

  insert_cliente(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'cliente/registrar',data,{headers:headers});
  }

  get_cliente(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'cliente/'+id,{headers:headers});
  }

  update_cliente(data):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'cliente/editar/'+data._id,data,{headers:headers});
  }

  delete_cliente(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'/cliente/eliminar/'+id,{headers:headers});
  }
}
