import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.scss']
})
export class EmployeedetailsComponent implements OnInit {

  constructor(private _activatedRouter : ActivatedRoute, private _employeeService: EmployeesService){}
  
  emp_id = this._activatedRouter.snapshot.params.rid;

  designations:any = [];
  reporting_manager:any = [];
  personal_data:any = [];


  ngOnInit(): void {

      this.employeeData();
  }

  employeeData(){

    this._employeeService.getSingleEmployee(this.emp_id).subscribe( (res:any) =>{
      res.data.forEach((element:any) => {
        this.designations = element.designations;
        this.personal_data = element.personal_data;
        this.reporting_manager = element.reporting_manager;
      });
    
      console.log('designations', this.designations)
      console.log('personal_data', this.personal_data)
      console.log('reporting_manager', this.reporting_manager)

    });
  }

}
