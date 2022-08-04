import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { EmployeesComponent } from './employees/employees.component';
import { AboutComponent } from './organization/about/about.component';
import { TreeviewComponent } from './organization/treeview/treeview.component';
import { HrpoliciesComponent } from './companypolicies/hrpolicies/hrpolicies.component';
import { HolidaylistComponent } from './companypolicies/holidaylist/holidaylist.component';
import { EmployeedetailsComponent } from './employees/employeedetails/employeedetails.component';
import { LeavesComponent } from './operations/leaves/leaves.component';
import { TokenguardGuard } from '../authguard/tokenguard.guard';
import { LeaveBalanceVersionComponent } from './operations/leaves/leave-balance-version/leave-balance-version.component';

const routes: Routes = [

  {
    path:'', component: PagesComponent,
    children : [
      { path: 'dashboard', component: DashboardComponent,canActivate:[TokenguardGuard] },
      { path: 'employees', component: EmployeesComponent,canActivate:[TokenguardGuard] },
      { path: 'employee-detail/:rid', component: EmployeedetailsComponent },
      { path: 'about', component: AboutComponent,canActivate:[TokenguardGuard] },
      { path: 'treeview', component: TreeviewComponent,canActivate:[TokenguardGuard] },
      { path: 'hrpolicies', component: HrpoliciesComponent,canActivate:[TokenguardGuard] },
      { path: 'holidays', component: HolidaylistComponent,canActivate:[TokenguardGuard] },
      { path: 'leaves', component: LeavesComponent,canActivate:[TokenguardGuard] },
      { path: 'leave-balance-version/:leave_id/:year', component: LeaveBalanceVersionComponent,canActivate:[TokenguardGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
