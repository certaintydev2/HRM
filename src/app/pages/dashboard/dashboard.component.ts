import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { CompanypoliciesService } from '../../services/companypolicies/companypolicies.service';
import { RecruitmentService } from '../../services/recruitment/recruitment.service';
import { EmployeesService } from '../../services/employees/employees.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
totalEmployees:any;
totalHolidays:any;
totalOpnings:any;

  constructor(private _employee: EmployeesService, private _holiday:CompanypoliciesService, private _recruitment:RecruitmentService) { }

  ngOnInit(): void {

    this._recruitment.openingsList().subscribe( (res:any) =>{
      console.log('openingsList',res);
        const allOpnings = res.data;
        if(!!allOpnings.length){
            this.totalOpnings = allOpnings.length;
         }
      });
      
    this. getTotalEmployees();
  }

  getTotalEmployees(){
    this._employee.employeeList().subscribe( (res:any) =>{
      const allEmployees = res.data;
      if(!!allEmployees.length){
        this.totalEmployees = allEmployees.length;
     }
    });

    this._holiday.allHolidaydata().subscribe( (res:any) =>{
      const allHolidays = res.data;
      if(!!allHolidays.length){
        this.totalHolidays = allHolidays.length;
     }
    });

   

  }



}
