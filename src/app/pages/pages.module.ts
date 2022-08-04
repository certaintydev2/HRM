import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MaterialModule } from '../materialmodule/materialmodule';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { EmployeesComponent } from './employees/employees.component';
import { AboutComponent } from './organization/about/about.component';
import { AddemployeesComponent } from './employees/addemployees/addemployees.component';
import { TreeviewComponent } from './organization/treeview/treeview.component';
import { HrpoliciesComponent } from './companypolicies/hrpolicies/hrpolicies.component';
import { HolidaylistComponent } from './companypolicies/holidaylist/holidaylist.component';
import { EmployeedetailsComponent } from './employees/employeedetails/employeedetails.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ChartComponent } from './dashboard/chart/chart.component';
import { LeavesComponent } from './operations/leaves/leaves.component';
import { BalanceComponent } from './operations/balance/balance.component';
import { RequestComponent } from './operations/request/request.component';
import { ExcelActionComponent } from './excel-action/excel-action.component';
import { LeaveBalanceVersionComponent } from './operations/leaves/leave-balance-version/leave-balance-version.component';

FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [
    PagesComponent,
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    EmployeesComponent,
    AboutComponent,
    AddemployeesComponent,
    TreeviewComponent,
    HrpoliciesComponent,
    HolidaylistComponent,
    EmployeedetailsComponent,
    ChartComponent,
    LeavesComponent,
    BalanceComponent,
    LeaveBalanceVersionComponent,
    RequestComponent,
    ExcelActionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxSpinnerModule,
    NgxOrgChartModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NgbModule,
    FullCalendarModule,
    
    FormsModule, 
    ReactiveFormsModule,
    PagesRoutingModule,
    ChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:[PagesComponent]
})
export class PagesModule { }
