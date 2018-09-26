import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { NgSelectModule } from '@ng-select/ng-select';
import { InterviewformComponent } from './interviewform.component';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    "path": "",
    "component": InterviewformComponent,
  }
];
@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgSelectModule,
    FormsModule,

    // NgSelectModule,
    ReactiveFormsModule

  ], exports: [
    RouterModule
  ], declarations: [
    InterviewformComponent
  ],
  providers: [
   
  ],
})
export class InterviewModule { }
