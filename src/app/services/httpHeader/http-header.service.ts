import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  
  APIurl : any;
  token:any       =    localStorage.getItem('token');

  constructor() { 

    this.APIurl = environment.apiURL;

  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json","Authorization":'Bearer '+this.token
    })
  };
  
}
