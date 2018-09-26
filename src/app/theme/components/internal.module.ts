import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../pages/default/default.component';
import { LayoutModule } from '../layouts/layout.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';

import { PunchingComponent } from './punching/punching.component';
import { LeaveComponent } from './leave/leave.component';
import { PunchingrecordsComponent } from './punchingrecords/punchingrecords.component';
import { ModifiedrecordsComponent } from './modifiedrecords/modifiedrecords.component';
import { ApprovalrecordsComponent } from './approvalrecords/approvalrecords.component';
import { AssignleaveComponent } from './assignleave/assignleave.component';
import { OfficialleaveComponent } from './officialleave/officialleave.component';
import { HrpolicyComponent } from './hrpolicy/hrpolicy.component';
import { EmployeeprofileComponent } from './employeeprofile/employeeprofile.component';
import { ExitformComponent } from './exitform/exitform.component';
import { ExitemployeerecordsComponent } from './exitemployeerecords/exitemployeerecords.component';
import { UsersComponent } from './users/users.component';
import { EmployeeformComponent } from './employeeform/employeeform.component';
import { AllprofilesComponent } from './allprofiles/allprofiles.component';
import { CandidateprofileComponent } from './candidateprofile/candidateprofile.component';
import { AllemployeeprofileComponent } from './allemployeeprofile/allemployeeprofile.component';
import { RequestformComponent } from './requestform/requestform.component';
import { PendriverequestComponent } from './pendriverequest/pendriverequest.component';
import { InternetaccessrequestComponent } from './internetaccessrequest/internetaccessrequest.component';
import { FolderaccessrequestComponent } from './folderaccessrequest/folderaccessrequest.component';
import { StationeryitemrequestComponent } from './stationeryitemrequest/stationeryitemrequest.component';
import { ApprovependrivereqComponent } from './approvependrivereq/approvependrivereq.component';
import { ApproveinternetreqComponent } from './approveinternetreq/approveinternetreq.component';
import { ApprovefolderreqComponent } from './approvefolderreq/approvefolderreq.component';
import { ApprovestationeryitemreqComponent } from './approvestationeryitemreq/approvestationeryitemreq.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RequestlicenseComponent } from './requestlicense/requestlicense.component';
import { PendinglicenseComponent } from './pendinglicense/pendinglicense.component';
import { GeneratelicenseComponent } from './generatelicense/generatelicense.component';
import { LicensedetailsComponent } from './licensedetails/licensedetails.component';
import { AuthGuard } from '../../_guards';
import { MyscrumComponent } from './myscrum/myscrum.component';

const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
        {
            path: 'punching',
            component: PunchingComponent,// canActivate: [AuthGuard] 
          },
          {
            path: 'leave',
            component: LeaveComponent,// canActivate: [AuthGuard] 
          },
          {
            path: 'punchingRecords',
            component: PunchingrecordsComponent,// canActivate: [AuthGuard]
          }
          ,
          {
            path: 'modifiedRecords',
            component: ModifiedrecordsComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'appovalRecords',
            component: ApprovalrecordsComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'assignLeave',
            component: AssignleaveComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'holidays',
            component: OfficialleaveComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'hrPolicy',
            component: HrpolicyComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'myprofile',
            component: EmployeeprofileComponent,// canActivate: [AuthGuard]
          }, 
          {
            path: 'employeeprofile/:id',
            component: EmployeeprofileComponent,// canActivate: [AuthGuard]
          }, 
          {
            path: 'exitform',
            component: ExitformComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'exitemployeerecords',
            component: ExitemployeerecordsComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'users',
            component: UsersComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'employeeform',
            component: EmployeeformComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'allprofiles',
            component: AllprofilesComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'allemployeeprofiles',
            component: AllemployeeprofileComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'candidateprofile/:id',
            component: CandidateprofileComponent,// canActivate: [AuthGuard]
          },
          {
            path: 'requestform',
            component: RequestformComponent,// canActivate: [AuthGuard],
          },
          {
            path:'pendriveRequest',
            component:PendriverequestComponent,// canActivate: [AuthGuard]
          },
          {
            path:'internetAccessReq',
            component:InternetaccessrequestComponent,// canActivate: [AuthGuard]
          },
          {
            path:'folderAccessReq',
            component:FolderaccessrequestComponent,// canActivate: [AuthGuard]
          },
          {
            path:'stationeryItemAccessReq',
            component:StationeryitemrequestComponent,// canActivate: [AuthGuard]
          },
          {
            path:'approvependriveReq',
            component:ApprovependrivereqComponent,// canActivate: [AuthGuard]
          },
          {
            path:'approveInternetReq',
            component:ApproveinternetreqComponent,// canActivate: [AuthGuard]
          },
          {
            path:'approveFolderReq',
            component:ApprovefolderreqComponent,// canActivate: [AuthGuard]
          },
          {
            path:'approveStationeryItemReq',
            component:ApprovestationeryitemreqComponent,// canActivate: [AuthGuard]
          },
          {
            path:'inventoryStock',
            component:InventoryComponent,// canActivate: [AuthGuard]
          },
          {
            path:'requestLicense',
            component:RequestlicenseComponent,// canActivate: [AuthGuard]
          },
          {
            path:'pendingLicense',
            component:PendinglicenseComponent,// canActivate: [AuthGuard]
          },
          {
            path:'generateLicense',
            component:GeneratelicenseComponent,// canActivate: [AuthGuard]
          },
          {
            path:'generateLicenseById/:id',
            component:GeneratelicenseComponent,// canActivate: [AuthGuard]
          },
          {
            path:'licensedetails',
            component:LicensedetailsComponent,//canActivate: [AuthGuard]
          },
          {
            path:'myScrum',
            component:MyscrumComponent,
          }

    ]
  },

];
@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    LayoutModule,
    FormsModule,
    ReactiveFormsModule

  ], exports: [
    RouterModule
  ], declarations: [
    
    PunchingComponent,
    LeaveComponent,
    PunchingrecordsComponent,
    ModifiedrecordsComponent,
    ApprovalrecordsComponent,
    AssignleaveComponent,
    OfficialleaveComponent,
    HrpolicyComponent,
    EmployeeprofileComponent,
    ExitformComponent,
    ExitemployeerecordsComponent,
    UsersComponent,
    EmployeeformComponent,
    AllprofilesComponent,
    CandidateprofileComponent,
    AllemployeeprofileComponent,
    RequestformComponent,
    PendriverequestComponent,
    InternetaccessrequestComponent,
    FolderaccessrequestComponent,
    StationeryitemrequestComponent,
    ApprovependrivereqComponent,
    ApproveinternetreqComponent,
    ApprovefolderreqComponent,
    ApprovestationeryitemreqComponent,
    InventoryComponent,
    RequestlicenseComponent,
    PendinglicenseComponent,
    GeneratelicenseComponent,
    LicensedetailsComponent,
    MyscrumComponent
  ],
  providers: [
    
  ],
})
export class InternalModule { }
