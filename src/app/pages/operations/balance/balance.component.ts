import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { OperationsService } from '../../../services/operations/operations.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ExcelExportService } from '../../../services/excel-export/excel-export.service';
import { Commoncontent } from 'src/app/commoncontent';
import { Commonconstant } from 'src/app/commonconstant';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare let $: any

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(('scheduledOrdersPaginator')) paginator!: MatPaginator;

  displayedColumns: string[] = ['employee_name', 'total_el', 'eligible_el', 'el_last_yr_carry_forward', 'el_taken_in_current_year','sl_cl_balance','status','action'];
  pageSize = 7;
  dataSource = new MatTableDataSource<any>();

  term: any;
  storeEqELCurrentYear = ""
  storeEqLWP = ""
  storeEqSLCLCurrentYear = ""
  commonContent = Commoncontent
  submit_btn = Commoncontent.BTN_UPDATE
  title = Commoncontent.LEAVES_BALANCE_ADD
  modified_field = ""
  environment = environment
  emp_id: any
  selected_filter_date: any
  selected_filter_status = 2
  year_range: any[] = [];
  pre_year_range: any[] = []
  all_record: any[] = []
  start_date: any;
  cur_date: any;
  year = {};
  latest_leaves_data: any;
  all_leaves_data: any;
  total_el: any;
  total_sl: any;
  lwp = 0;
  el_last_yr_carry_forward: number = 0;
  eligible_el = 0;
  eligible_sl = 0;
  el_cur_yr = 0;
  sl_cl_cur_yr = 0;
  el_encashed = 0;
  el_balace = 0;
  days = 0;
  associatedMessage: any;
  showTable = false;
  serverError = false
  showServerError: any
  employee_data: any;
  desgdata: any
  initialPage = 1;
  datalength: any;
  searchValue: any
  error404 = false
  sl_cl_balance: any
  excel_action = {
    uploadapi: "import_leave",
    sheetpath: "../../../assets/.xlxs/leave_balance_sheet.xlsx",
    sheetname: "leave_balance_sheet"
  }
  statusFilterDDl = [
    { id: 2, status: "ALL" },
    { id: 1, status: "Active" },
    { id: 0, status: "Inactive" }
  ]
  clickElement = Commonconstant.LEAVES_BALANCE_EVENT

  updateLeavesBalance = new FormGroup({
    rid: new FormControl(''),
    emp_id: new FormControl(''),
    total_el: new FormControl(''),
    total_sl: new FormControl(''),
    eligible_el: new FormControl(''),
    eligible_sl: new FormControl(''),
    el_last_yr_carry_forward: new FormControl(''),
    lwp: new FormControl(''),
    el_cur_yr: new FormControl(''),
    sl_cl_cur_yr: new FormControl(''),
    el_encashed: new FormControl(''),
    el_balance: new FormControl(''),
    sl_cl_balance: new FormControl(''),
    year: new FormControl(''),
    lwp_comment: new FormControl(''),
    el_comment: new FormControl(''),
    sl_cl_comment: new FormControl(''),
    modified_field: new FormControl(''),
    start_date: new FormControl(''),
    cur_date: new FormControl('')
  })
  
  constructor(
    private router: Router,
    private api: OperationsService,
    private ExcelExportService: ExcelExportService,
    private ngxspinner: NgxSpinnerService,
    private _http:HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.ngxspinner.show()
    this.getAllLeaves()
  }

  getPreviousYearddl() {
    let pre_year = new Date().getFullYear();
    this.selected_filter_date = pre_year
    this.pre_year_range = [{ "year": pre_year + 1 }];
    this.pre_year_range = [...this.pre_year_range, { "year": pre_year }];
    for (var i = 1; i < 6; i++) {
      this.pre_year_range = [...this.pre_year_range, { "year": pre_year - i }];
    }
  }

  // Get all Leave Balance and 
  getAllLeaves() {
    this.api.dropdownForLeaves().subscribe((result: any) => {
      console.log('result', result)
      if (result.status == 200) {
        this.employee_data = result.data
        this.error404 = false
      } else if (result.status == 404) {
        this.error404 = true
      }
    })
    this.api.allLeavesList().subscribe((result: any) => {
      console.log(result);
      if (result.status == 200) {
        
        this.all_leaves_data = []
        this.all_record = result.data
        for (let i = 0; i < this.all_record.length; i++) {
          this.all_record[i].el_taken_in_current_year = (this.all_record[i].el_cur_yr == '') ? 0 : eval(this.all_record[i].el_cur_yr);
          this.all_record[i].lwp = (this.all_record[i].lwp == '') ? 0 : eval(this.all_record[i].lwp);
          this.all_record[i].sl_cl_in_current_year_taken = (this.all_record[i].sl_cl_cur_yr == '' )?0: eval(this.all_record[i].sl_cl_cur_yr)
        }
        this.ngxspinner.hide()
        this.filterDataYear()
        this.getPreviousYearddl()
        this.closeModal();
        this.all_leaves_data = this.all_record
        this.dataSource = new MatTableDataSource(this.all_leaves_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('all_leaves_data', this.all_leaves_data)

      } else if (result.status == 404) {
        this.error404 = true
        this.ngxspinner.hide()
      }
    })
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Refresh Data
  refresh() {
    this.term = ""
    this.all_leaves_data = this.all_record
  }

  closeModal(){
    this.modalService.dismissAll();
  }
  // Filter details via year
  filterDataYear() {
    this.all_leaves_data = []
    if (this.selected_filter_date) {
      for (let i = 0; i < this.all_record.length; i++) {
        if (parseInt(this.all_record[i].year) == this.selected_filter_date) {
          this.all_leaves_data.push(this.all_record[i])
        }
      }
    }
    else {
      this.selected_filter_date = ""
    }
    if (this.all_leaves_data.length == 0) {
      this.error404 = true
    }
    else {
      this.error404 = false
    }
  }

  // Filter data by using status
  filterDataStatus() {
    this.all_leaves_data = []
    for (let i = 0; i < this.all_record.length; i++) {
      if (this.selected_filter_status == 2) {
        if (parseInt(this.all_record[i].year) == this.selected_filter_date) {
          this.all_leaves_data.push(this.all_record[i])
          
        }
        
      }
      else if (this.all_record[i].is_active == this.selected_filter_status && parseInt(this.all_record[i].year) == this.selected_filter_date) {
        this.all_leaves_data.push(this.all_record[i])
        
      }
    }
    
    if (this.all_leaves_data.length == 0) {
      this.error404 = true
    }
    else {
      this.error404 = false
    }
  }

  

  
  // Open popup when we add leaves balance
  openPopup(content:any) {
    this.submit_btn = Commoncontent.BTN_SAVE
    this.title = Commoncontent.LEAVES_BALANCE_ADD
    this.modalService.open(content, { centered: true,size: 'xl',  scrollable: true  });
  }

  // close popup by close button on popup and also close when we add and update leaves balance successfull
  

  /**
   * insert and update curd operation code
   * @param formData 
   */
   insertUpdateLeavesBalance(formData: any) {
    if (formData.emp_id && formData.total_sl && formData.year){
      let api = `/leave`
      if (formData.rid) {
        Object.keys(this.updateLeavesBalance.controls).forEach((name: any) => {
          let currentControl = this.updateLeavesBalance.controls[name];
          if (currentControl.dirty) {
            this.modified_field = this.modified_field == "" ? name : this.modified_field + "," + name;
          }
        });
        api = `/leave?rid=${formData.rid}`
      }

      this.updateLeavesBalance = new FormGroup({
        emp_id: new FormControl(formData.emp_id),
        total_el: new FormControl(formData.total_el),
        total_sl: new FormControl(formData.total_sl),
        eligible_el: new FormControl(formData.eligible_el),
        eligible_sl: new FormControl(formData.eligible_sl),
        el_last_yr_carry_forward: new FormControl(formData.el_last_yr_carry_forward),
        lwp: new FormControl(this.storeEqLWP),
        el_cur_yr: new FormControl(this.storeEqELCurrentYear),
        sl_cl_cur_yr: new FormControl(this.storeEqSLCLCurrentYear),
        el_encashed: new FormControl(formData.el_encashed),
        el_balance: new FormControl(formData.el_balance),
        sl_cl_balance: new FormControl(this.sl_cl_balance),
        year: new FormControl(formData.year),
        lwp_comment: new FormControl(formData.lwp_comment),
        el_comment: new FormControl(formData.el_comment),
        sl_cl_comment: new FormControl(formData.sl_cl_comment),
        modified_field: new FormControl(this.modified_field),
        start_date: new FormControl(this.start_date),
        cur_date: new FormControl(this.cur_date)
      })
      this._http.post(environment.apiURL + api, this.updateLeavesBalance.getRawValue()).subscribe((result: any) => {
        if (result.status == 200) {
          this.serverError = false
          this.getAllLeaves();
          $('#container').removeClass('opacity')
          $('#head').removeClass('opacity')
          document.getElementById("progressModal")!.style.display = "none";
          this.updateLeavesBalance.reset();
          this.submit_btn = "Update"
        } else if (result.status == 404) {
          this.getAllLeaves();
          this.serverError = true
          this.showServerError = result.message
          this.updateLeavesBalance.reset();
        }
      })
    }
    else
      return;
  }

  // Get year
  changeYear(year: any) {
    this.year = year
  }



  // Update the form field of perticular data 
  editLeavesBalance(data: any, content:any) {
    this.modalService.open(content, { centered: true,size: 'xl',  scrollable: true  });
  
    this.submit_btn = Commoncontent.BTN_UPDATE;
    this.title = Commoncontent.LEAVES_BALANCE_UPDATE;

    this.el_cur_yr = (data.el_cur_yr == "") ? 0 : eval(data.el_cur_yr);
    this.sl_cl_cur_yr = (data.sl_cl_cur_yr == "") ? 0 : eval(data.sl_cl_cur_yr);
    this.lwp = (data.lwp == "")? 0 : eval(data.lwp);
    this.el_encashed = (data.el_encashed == "")? 0 : eval(data.el_encashed);
    this.sl_cl_balance = (data.sl_cl_balance =="")? 0 : eval(data.sl_cl_balance);
    this.el_balace = (data.el_balance=="")?0:eval(data.el_balance);
    this.total_el = data.total_el;
    this.total_sl = data.total_sl;
    this.start_date = data.start_date;
    this.cur_date = data.cur_date;
    this.el_last_yr_carry_forward = data.el_last_yr_carry_forward;
    let diff_in_time = new Date(data.cur_date).getTime() - new Date(data.start_date).getTime();
    this.days = Math.ceil(diff_in_time / (1000 * 3600 * 24));

    this.updateLeavesBalance = new FormGroup({
      rid: new FormControl(data.rid),
      eligible_el: new FormControl(data.eligible_el),
      eligible_sl: new FormControl(data.eligible_sl),
      el_balance: new FormControl(data.el_balance),
      sl_cl_balance: new FormControl(data.sl_cl_balance),
      total_el: new FormControl(data.total_el),
      total_sl: new FormControl(data.total_sl),
      el_last_yr_carry_forward: new FormControl(data.el_last_yr_carry_forward),
      lwp: new FormControl(data.lwp),
      el_cur_yr: new FormControl(data.el_cur_yr),
      sl_cl_cur_yr: new FormControl(data.sl_cl_cur_yr),
      el_encashed: new FormControl(data.el_encashed),
      emp_id: new FormControl(data.emp_id),
      start_date: new FormControl(data.start_date),
      cur_date: new FormControl(data.cur_date),
      year: new FormControl(data.year),
      lwp_comment: new FormControl(data.lwp_comment),
      el_comment: new FormControl(data.el_comment),
      sl_cl_comment: new FormControl(data.sl_cl_comment),
    })

  }

  // call Active and Inactive API
  status(is_active: any, rid: any) {
    let status = "active";

    if (is_active == 1) 
      status = "inactive";
    
      this.api.leaveStatus(rid, status).subscribe((data: any) => {
        if (data.status == 200) {
          this.getAllLeaves();
          this.filterDataStatus()
        }
      })
    
  }
  // Calcuate leaves
  calculateLeave(e: any) {
    
    let inputVal = e.target.value;

    e.target.value = eval(inputVal);
    if (e.currentTarget.name == 'el_cur_yr') {

      this.el_cur_yr = parseInt(e.target.value)
      this.storeEqELCurrentYear = inputVal
    }
    else if (e.currentTarget.name == 'sl_cl_cur_yr') {
      this.sl_cl_cur_yr = parseInt(e.target.value)
      this.storeEqSLCLCurrentYear = inputVal
    }
    else if (e.currentTarget.name == 'lwp') {
      this.lwp = parseInt(e.target.value)
      this.storeEqLWP = inputVal
    }
    else if (e.currentTarget.name == 'el_encashed') {
      this.el_encashed = parseInt(e.target.value)
    }
    this.leaveBalanceEligibleCal();
  }

  // calculation for LEAVE BALANCE and ELIGIBLITY
  leaveBalanceEligibleCal(){

    let eligible_el = ((this.days - (this.lwp * 30 / 25)) / 365 * this.total_el).toFixed(9)
    let eligible_sl = ((this.days - (this.lwp * 30 / 25)) / 365 * this.total_sl).toFixed(9)
    let el_balance_calculate = (parseFloat(eligible_el) + (this.el_last_yr_carry_forward) - (this.el_cur_yr) - (this.el_encashed)).toFixed(9)
    this.sl_cl_balance = (parseFloat(eligible_sl) - (this.sl_cl_cur_yr)).toFixed(9)
    this.updateLeavesBalance.patchValue({ lwp: this.lwp, el_balance: el_balance_calculate, eligible_el: eligible_el, eligible_sl: eligible_sl, sl_cl_balance: this.sl_cl_balance, el_last_yr_carry_forward:this.el_last_yr_carry_forward })

  }

  // Get Employee code, start date, current date and carray forward from last year EL
  seletedDate(code: any) {
    let emp_id = code.emp_id || code.rid;
    let empData:any = this.employee_data.find(( emp:any ) => emp.rid === emp_id );
    this.el_last_yr_carry_forward = empData.el_last_yr_carry_forward;
    this.total_el = empData.total_el;
    this.total_sl = empData.total_sl;
    this.start_date = empData.start_date;
    this.cur_date = empData.current_date;
    let diff_in_time = new Date(this.cur_date).getTime() - new Date(this.start_date).getTime();
    this.days = Math.ceil(diff_in_time / (1000 * 3600 * 24));
    this.leaveBalanceEligibleCal();
  
  }

  redirectToVersionHistory(rid:any, year:any){
    var url: string[] = ['/pages/leave-balance-version/'+rid+'/'+year]
    this.router.navigate(url)
  }

  // All leaves data download
  allLeavesAsXLSX(): void {
    this.ExcelExportService.exportAsExcelFile(this.all_leaves_data, 'AllLeavesBalance');
  }

  // Latest leaves data download
  latestLeavesAsXLSX(): void {
    this.ExcelExportService.exportAsExcelFile(this.latest_leaves_data, 'LatestLeavesBalance');
  }

}
