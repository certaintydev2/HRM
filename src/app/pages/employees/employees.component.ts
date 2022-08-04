import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import {MatDialog} from '@angular/material/dialog';
import { AddemployeesComponent } from './addemployees/addemployees.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  
  @ViewChild(MatSort,  {static: false}) sort!: MatSort;
  @ViewChild(('scheduledOrdersPaginator'),  {static: false}) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'mobile', 'employee_code', 'joining_date', 'status' ,'view'];
  pageSize = 7;
  dataSource = new MatTableDataSource<any>();
  employeeListdata:any;
  personalData:any = [];

  constructor( private _employeeServices: EmployeesService, public dialog: MatDialog) { }


  ngOnInit(): void {

    this._employeeServices.employeeList().subscribe( res => {
      this.employeeListdata = res;
      console.log('employee res', res);
        this.employeeListdata.data.forEach((row:any) => {
          this.personalData.push(row.personal_data);
        });
      this.dataSource = new MatTableDataSource(this.personalData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      })
    }

    ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddemployeesComponent, {
      width: "100%",
    });
  }

  
}
