import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaderService } from '../httpHeader/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private _http:HttpClient, private _header:HttpHeaderService) { }

  organizationlist(){
    
    return this._http.get(this._header.APIurl+"/orgnization_tree");
  }
}
