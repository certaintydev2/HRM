import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaderService } from '../httpHeader/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class CompanypoliciesService {
  

  constructor(private _header: HttpHeaderService, private _http: HttpClient ) {}

  allPoliciesdata(){
    
    return this._http.get(this._header.APIurl+"/all_policy");
    
  }
  
  dropdownPoliciesList(data:any){
    
    return this._http.get(this._header.APIurl+"/policy_title_ddl?flag="+ data);
    
  }

  deletePolicies(id:any){
    
    return this._http.get(this._header.APIurl+"/remove_policy?rid=" + id);
    
  }

  addNewPolicie(obj:any){

    return this._http.post(this._header.APIurl+'/policy', obj);

  }
  

  updatePolicies(id:any){
    
    return this._http.get(this._header.APIurl+"/policy?rid=" + id);
    
  }

  
  // holidays 

  allHolidaydata(){
    
    return this._http.get(this._header.APIurl+"/holidays");
    
  }

  addNewHoliday(obj:any){

    return this._http.post(this._header.APIurl+'/holidays', obj);

  }
  
}
