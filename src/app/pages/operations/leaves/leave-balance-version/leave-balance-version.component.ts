import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { Commonconstant } from 'src/app/commonconstant';
import { Commoncontent } from 'src/app/commoncontent';
import { OperationsService } from '../../../../services/operations/operations.service';


@Component({
  selector: 'app-leave-balance-version',
  templateUrl: './leave-balance-version.component.html',
  styleUrls: ['./leave-balance-version.component.scss']
})

export class LeaveBalanceVersionComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(('scheduledOrdersPaginator')) paginator!: MatPaginator;

  displayedColumns: string[] = ['basicDetails', 'EarnedLeaves', 'LeaveWithoutPay', 'SLCL'];
  pageSize = 7;
  dataSource = new MatTableDataSource<any>();

  dataSharedApi  = {
  }
  sharedYear:any
  version_data:any = []
  datalength:any
  clickElement = Commonconstant.LEAVES_BALANCE_EVENT
  commonContent  = Commoncontent
  constructor(
    private router: Router,
    private api: OperationsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dataSharedApi = {
      rid:this.activatedRoute.snapshot.params.leave_id,
      year: this.activatedRoute.snapshot.params.year
    }
  this.getVersionData()
  }
  goBackLeaveBalance(){
    var url: string[] = ['/pages/leaves']
    this.router.navigate(url)
  }
  getVersionData(){
    this.api.leaveVersion(this.activatedRoute.snapshot.params.leave_id,this.activatedRoute.snapshot.params.year).subscribe((result:any)=>{
      if(result.status == 200){
        this.datalength = this.version_data.length
        this.version_data = result.data
        this.dataSource = new MatTableDataSource(this.version_data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log('version_data', this.version_data)
      }
    })
  }
}
