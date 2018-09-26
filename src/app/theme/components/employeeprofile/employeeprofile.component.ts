import { Component, OnInit } from '@angular/core';

import { EmployeeDetail } from '../../pojo classes/employeedetail';
import { ActivityDetail } from '../../pojo classes/activitydetail';
import { QualificationDetail } from '../../pojo classes/qualificationdetail';
import { TrainingDetail } from '../../pojo classes/trainingdetail';
import { LanguageDetail } from '../../pojo classes/languagedetail';
import { SoftwareDetail } from '../../pojo classes/softwaredetail';
import { MembershipDetail } from '../../pojo classes/memberdetail';
import { ExpirenceDetail } from '../../pojo classes/experiencedetail';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {

  headHS:any = true;
  constructor(private userService:UsersService,private _ActivatedRoute: ActivatedRoute) { }

    employee:EmployeeDetail= new EmployeeDetail();
    activity:ActivityDetail=new ActivityDetail();
    qualification:QualificationDetail=new QualificationDetail();
    training:TrainingDetail=new TrainingDetail();
    language:LanguageDetail=new LanguageDetail();
    expirence:ExpirenceDetail=new ExpirenceDetail();
    software:SoftwareDetail=new SoftwareDetail();
    membership:MembershipDetail=new MembershipDetail();
    verification:any;
    username:any;

    fullname:any;
    userid:any="";
  ngOnInit()
  {
    this.username=localStorage.getItem('currentUser');    
    this.userid=this._ActivatedRoute.snapshot.params['id'];
    this.getEmployeeDetails(this.userid);
  }
  getEmployeeDetails(userid)
  {
    if(userid != null)
    {
      this.employee= new EmployeeDetail();
        this.userService.getEmployeeDetailsById(userid).subscribe((data)=>
      {
        this.employee=JSON.parse(data['empData']);
        this.verification= this.employee.varification;  
        this.fullname= this.employee.fullname;
        if(this.employee != null)
        {
          this.headHS=false;
        }
        console.log(data['empData[user1]']);
        console.log(data);
      });
    }
    else
    {
      this.employee= new EmployeeDetail();
      var username=localStorage.getItem('currentUser');
      this.userService.getEmployeeDetails(username).subscribe((data)=>
      {
      this.employee=JSON.parse(data['empData']);
      this.verification= this.employee.varification; 
      if(this.employee != null)
      {
        this.headHS=false;
      }
      console.log(data['empData[user1]']);
      console.log(data);
      });
    } 
  }
  getPhoto(newphoto,originalphoto)
  {    
    this.userService.getResume(newphoto).subscribe(
      (data)=>
      {
        this.downloadFile(data,originalphoto);
      });
  }
  getFile(newResume,originalfile)
  {
      this.userService.getResume(newResume).subscribe(
        (data)=>
        {
          alert(data);
          this.downloadFile(data,originalfile);
        });
  }
  downloadFile(data,filename:any){

        
    var csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'}); 
    var csvURL = window.URL.createObjectURL(csvData); 
    var tempLink = document.createElement('a'); 
    tempLink.href = csvURL; 
    tempLink.setAttribute('download', filename); 
    tempLink.click();
  }


}
