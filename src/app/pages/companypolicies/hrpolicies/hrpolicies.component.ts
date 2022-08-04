import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { CompanypoliciesService } from 'src/app/services/companypolicies/companypolicies.service';
import { environment } from "../../../../environments/environment";
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-hrpolicies',
  templateUrl: './hrpolicies.component.html',
  styleUrls: ['./hrpolicies.component.scss']
})
export class HrpoliciesComponent implements OnInit {

  @ViewChild(MatSort,  {static: false}) sort!: MatSort;
  @ViewChild(('scheduledOrdersPaginator'),  {static: false}) paginator!: MatPaginator;

  @ViewChild('deletePoliciesPopup') deletePoliciesPopup!: TemplateRef<any>;
  @ViewChild('AddNewPoliciesPopup') AddNewPoliciesPopup!: TemplateRef<any>;

  displayedColumns: string[] = ['title', 'date', 'pdfUpload', 'remark', 'action'];
  pageSize = 7;
  dataSource = new MatTableDataSource<any>();
  employeeListdata:any;
  personalData:any = [];
  documentURL = environment.docURL;
  updateData:any;
  title_id = 0;
  oldPdfUploaded:any;
  displayOldPdf:boolean = false;
  btnText= '';
  title = ''
  storeDeleteData:any;
  dialogRef:any;
  finalDate:any;
  pdfUpload:any = [];
  dropdown_hr_policy_data:any;
  rid:any;
  flag = "for_insert"
  post:any = {
    title_id: '',
    updated_date: '',
    remark: '',
    policy_doc: '',
  };

  constructor(private modalService: NgbModal,private _policiesService:CompanypoliciesService, public dialog: MatDialog, private _fb: FormBuilder,private toastr: ToastrService, private _policieServices:CompanypoliciesService) { 

    

  }

  ngOnInit(): void {

    this.holidayListFunction();
    
  }

  holidayListFunction(){
    this._policiesService.allPoliciesdata().subscribe( (res:any) => {
      this.personalData = res.data
      this.dataSource = new MatTableDataSource(this.personalData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.personalData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  deletePolicies(data:any) {
    this.storeDeleteData = data;
    this.dialogRef = this.dialog.open(this.deletePoliciesPopup, {
      width: "30%",
    });
  }

  confirmedDelete(storeDeleteData:any) {
    this._policiesService.deletePolicies(storeDeleteData.rid).subscribe((res:any) =>{
      this.dialogRef.close();
      this._policiesService.allPoliciesdata().subscribe( (res:any) => {
        this.personalData = res.data
        this.dataSource = new MatTableDataSource(this.personalData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  // Year, month and day conversion
 
  conversionjson(event: any) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;
    return this.finalDate = year + "-" + month + "-" + day;
  }
  
  // closeResult: string;
  CreateNewPolicies(content:any) {
    this.title = 'Add New HR Policie'
    this.btnText = 'Save';
    if(this.post.rid){
      this.flag = "for_update"
    }else{
      this.flag = "for_insert"
    }
    this.dropDownAPI();
    this.modalService.open(content, { centered: true,size: 'lg' });
    this.post = {
      title_id: '',
      updated_date: '',
      remark: '',
      policy_doc: '',
    };
  }
  

  selectFile(event:any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.pdfUpload = event.target.files[0];
    // }

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.pdfUpload = event.target.files[0];
      this.post.policy_doc.patchValue({
        policy_doc: file
      });
    }
  }

  // Get policy in dropdown
  
  dropDownAPI() {
    console.log('flag', this.flag);
    this._policieServices.dropdownPoliciesList(this.flag).subscribe((result: any) => {
        this.dropdown_hr_policy_data = result.data
    });
  }

  AddNewPolicie(data:any){
    console.log('data', data);
    // console.log('this.pdfUpload', this.pdfUpload);
    this.finalDate = this.conversionjson(this.post.updated_date)
    const formData = new FormData();
    formData.append("title_id", this.post.title_id);
    formData.append("updated_date", this.finalDate);
    formData.append("policy_doc", this.pdfUpload);
    formData.append("remark", data.remark);
    this._policieServices.addNewPolicie(formData).subscribe( (res:any) =>{
      console.log('res', res);
      this.toastr.success(res?.message, '',{
        timeOut:2000,
        progressBar:true,
        progressAnimation:'decreasing'
      });
      this.holidayListFunction();
      this.modalService.dismissAll();
    })
  }

  
  update(data_single:any, content:any){
    this.modalService.open(content, { centered: true,size: 'lg' });
      this.btnText = 'Update';
      this.title = 'Update New HR Policie'
      this.flag = "for_update"
      this.dropDownAPI();
      this.updateData = data_single;

      this.title_id = this.updateData.title_id

      this.rid = this.updateData.rid
      
      this.displayOldPdf = true;
      
      this.oldPdfUploaded = this.updateData.policy_doc;
      
      const date = this.updateData.updated_date
      let arr1 = date.split('-');
        let updated_date = {
          year: parseInt(arr1[0]),
          month: parseInt(arr1[1]),
          day: parseInt(arr1[2])
        }
        this.post  = {
          title_id: this.title_id,
          updated_date: updated_date,
          remark: this.updateData.remark,
          policy_doc: this.pdfUpload,
        };
        console.log('data_element', this.updateData)
      this.holidayListFunction();
    
  }
}
