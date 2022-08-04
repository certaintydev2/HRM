import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss']
})
export class TreeviewComponent implements OnInit {


  nodes: any = [];
  org_tree: any
  clickElement = "org_tree"
  
  constructor(private _organizationService:OrganizationService, private _router:Router) { }

  ngOnInit(): void {

    
    this.listLoad();
  }

  listLoad(){
    this._organizationService.organizationlist().subscribe( (res:any) => {

      console.log('res=>', res);
      
      this.nodes = res.data;

    })
  }
  employeeDetailview(event:any){
    var url: string[] = ['pages/employee-detail']
    url.push(event.rid)
    event.employee_code == "CIPL-0" ? "" : this._router.navigate(url)
  }
}
