import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Candidatedetail } from '../../pojo classes/candidatedetail';
import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'app-candidateprofile',
  templateUrl: './candidateprofile.component.html',
  styleUrls: ['./candidateprofile.component.css']
})
export class CandidateprofileComponent implements OnInit {

  candidate= new Candidatedetail();
  userid:any;
  constructor(private _ActivatedRoute: ActivatedRoute,private userS:UsersService) { }
  username:any;
  ngOnInit()
  { 
    this.username=localStorage.getItem('currentUser');
    this.userid=this._ActivatedRoute.snapshot.params['id'];
    this.getCandidateDetail(this.userid);
  }

  getCandidateDetail(id)
  {
    this.candidate=new Candidatedetail();
    this.userS.getCandidateDetail(id).subscribe(
      (data:Candidatedetail)=>
      {
        this.candidate=data;
      });

  }

  getPhoto(newphoto,originalphoto)
  {    
    this.userS.getResume(newphoto).subscribe(
      (data)=>
      {
        this.downloadFile(data,originalphoto);
      });
  }
  getFile(newResume,originalfile)
  {
      this.userS.getResume(newResume).subscribe(
        (data)=>
        {
          this.downloadFile(data,originalfile);
        });
  }
  downloadFile(data,filename:any){
    debugger
    var csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'}); 
    var csvURL = window.URL.createObjectURL(csvData); 
    var tempLink = document.createElement('a'); 
    tempLink.href = csvURL; 
    tempLink.setAttribute('download', filename); 
    tempLink.click();
  }
  
}
