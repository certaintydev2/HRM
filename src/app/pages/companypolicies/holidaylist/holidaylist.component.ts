import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { CompanypoliciesService } from '../../../services/companypolicies/companypolicies.service';
import { environment } from "../../../../environments/environment";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $:any 

@Component({
  selector: 'app-holidaylist',
  templateUrl: './holidaylist.component.html',
  styleUrls: ['./holidaylist.component.scss']
})


export class HolidaylistComponent implements OnInit {

  
  constructor(private _holidayService:CompanypoliciesService, public modalService: NgbModal, public dialog: MatDialog, private _fb: FormBuilder,private toastr: ToastrService,) {

   }
  @ViewChild(MatSort,  {static: false}) sort!: MatSort;
  @ViewChild(('scheduledOrdersPaginator'),  {static: false}) paginator!: MatPaginator;
  @ViewChild('deletePoliciesPopup') deletePoliciesPopup!: TemplateRef<any>;

  displayedColumns: string[] = ['occasion', 'holiday_date', 'day', 'year', 'comments' ,'action'];
  pageSize = 7;
  dataSource = new MatTableDataSource<any>();
  holidayList:any = [];
  documentURL = environment.docURL;
  displayUpdateData:boolean = false
  title = ''
  btnText = ''
  post = {
    occasion:'',
    holiday_date:'',
    comments:'',
    rid:''
  };

  
  ngOnInit(): void {
    
    this.getAllHolidayList()
  }

  getAllHolidayList(){
    this._holidayService.allHolidaydata().subscribe((res:any)=>{
      this.holidayList = res.data;
      this.dataSource = new MatTableDataSource(this.holidayList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log('holiday data',res);
    })
  }

  // Year, month and day conversion
  finalDate:any;
  conversionjson(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    return this.finalDate = year + "-" + month + "-" + day;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // closeResult: string;
  createHolidayLives(content:any, data:any) {
    // console.log('data', data);
    this.title = 'Add Holiday List'
    this.btnText = 'Submit'
    this.displayUpdateData = false;
    this.modalService.open(content, { centered: true,size: 'lg' });
    this.post = {
      occasion:'',
      holiday_date:'',
      comments:'',
      rid:''
    };
  }
  
  changeData(){
      this.displayUpdateData = false;
  }

  AddNewHoliday(data:any){

    this.finalDate = this.conversionjson(this.post.holiday_date)
    let bodyData = {
      occasion: this.post.occasion,
      holiday_date: this.finalDate,
      comments: this.post.comments,
      rid: this.post.rid
    }
    console.log('body', bodyData);
    this._holidayService.addNewHoliday(bodyData).subscribe( (res:any) =>{
      this.toastr.success(res?.message, '',{
        timeOut:2000,
        progressBar:true,
        progressAnimation:'decreasing'
      });
      this.getAllHolidayList();
      this.post = {
        occasion:'',
        holiday_date:'',
        comments:'',
        rid:''
      };
      this.modalService.dismissAll();
    })
  }
  
  
  update(element:any, content:any){

    this.displayUpdateData = true;
    console.log('element', element)
    this.title = 'Update Holiday List'
    this.btnText = 'Update'
    this.modalService.open(content, { centered: true,size: 'lg' });
    let date = element.holiday_date
    let arr1 = date.split('-');
    let holiday_dateConvert = {
      year: parseInt(arr1[0]),
      month: parseInt(arr1[1]),
      day: parseInt(arr1[2])
    }
    this.finalDate = this.conversionjson(holiday_dateConvert)
    this.post = {
      occasion: element.occasion,
      holiday_date: this.finalDate,
      comments: element.comments,
      rid:element.rid
    }
  } 
}
