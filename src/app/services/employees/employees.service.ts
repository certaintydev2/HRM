import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaderService } from '../httpHeader/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {


  constructor(private _header: HttpHeaderService, private _http: HttpClient ) {

  }
  
  
  employeeList(){
    
    return this._http.get(this._header.APIurl+"/employee");
    
  }

  employeeAdd(data:any){
    
    return this._http.post(this._header.APIurl+"/employee", data);
    
  }

  getSingleEmployee(data:any){
    console.log('j',data);
    return this._http.get(this._header.APIurl+"/employee?rid=" + data);
    
  }
  
  
}
