import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaderService } from '../httpHeader/http-header.service';


@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private _http:HttpClient, private _header:HttpHeaderService) { }


  leaveStatus(data:any, status:any){
    console.log('status', status, 'data', data)
    return this._http.get(this._header.APIurl+"/leave_action?action="+status+"&rid=" + data);
  }


  allLeavesList(){
    
    return this._http.get(this._header.APIurl+"/all_leaves");
  }
  dropdownForLeaves(){
    
    return this._http.get(this._header.APIurl+"/employee_drop_down_for_leaves");
  }



  leaveVersion(leave_id:any, year:any){

    return this._http.get(this._header.APIurl+"/leave_balance_version?leave_balance_id="+leave_id+"&year="+year);

  }

  


}
