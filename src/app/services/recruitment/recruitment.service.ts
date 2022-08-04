import { Injectable } from '@angular/core';
import { HttpHeaderService } from '../httpHeader/http-header.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  
  constructor(private _header: HttpHeaderService, private _http: HttpClient ) {

  }
  
  
  openingsList(){

    return this._http.get(this._header.APIurl+"/openings");
    
  }

}
