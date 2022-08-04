import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FormBuilder, FormGroup,Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from 'src/app/services/employees/employees.service';

@Component({
  selector: 'app-addemployees',
  templateUrl: './addemployees.component.html',
  styleUrls: ['./addemployees.component.scss']
})
export class AddemployeesComponent implements OnInit {

  AddEmployeeGroup!: FormGroup;
  checkSubmit:boolean = false;

  constructor(public dialog: MatDialog, private _fb:FormBuilder, private _employeeService:EmployeesService) {

    this.AddEmployeeGroup = _fb.group({
      fullname: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      gender: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      experience: ['', Validators.required],
      grade: ['', Validators.required],
      OfficialEmail: ['', Validators.required],
      MicrosoftEmail: ['', Validators.required],
      PersonalEmailID: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      ReportingManager: ['', Validators.required],
      PrimaryManager: ['', Validators.required],
      BankAccountNumber: ['', Validators.required],
      IFSCcode: ['', Validators.required],
      PANNumber: ['', Validators.required],
      AadharNumber: ['', Validators.required],
      AlternateNumber: ['', Validators.required],
      BloodGroup: ['', Validators.required],
      DOBActual: ['', Validators.required],
      DOBdocumented: ['', Validators.required],
      MarriageAnniversary: [''],
      ResignationDate: [''],
      LastWorkingDay: [''],
      TemporaryAddress: ['', Validators.required],
      PermanentAddress: ['', Validators.required],
      ReasonforLeaving: ['', Validators.required],
    })
  }

  



  ngOnInit(): void {
  }

  saveNewEmployee(){
    console.log('this.AddEmployeeGroup.value', this.AddEmployeeGroup.value);
    
    this._employeeService.employeeAdd(this.AddEmployeeGroup.value).subscribe( res =>{
      console.log('add employee ', res);
    })
  }
}
