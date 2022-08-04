import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})


export class LoginService {
  
  APIurl : any;

  constructor(private _http:HttpClient, private _router:Router) {
    this.APIurl = environment.apiURL;

  }
   

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":"application/json","Authorization":'Bearer'
    })
  };
  
   loginUser(obj:any){

     return this._http.post(this.APIurl+'/login', obj, this.httpOptions);

   }

   logOut(){

     localStorage.removeItem("auth");
     localStorage.removeItem("id");
     this._router.navigateByUrl('login');

   }

   getToken(){

    return localStorage.getItem("auth");
    
  }

  isLoggedIn(){
    
    if(localStorage.getItem("auth")){
      return true;
    }else{
      return false;
    }
  }

}
