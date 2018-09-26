import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { User } from '../theme/pojo classes/user';

import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { PunchingService } from '../_services/punching.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validUSER:boolean=false;
  userdetails:any;
  users=new User;
  public show:boolean = false;
  action='';
  constructor(private router:Router,private _script: ScriptLoaderService,private punchingservice:PunchingService) { }
  status:any;
  data:Array<any>= [];
  validUser:boolean=false;
  punchingTime:any;
  admin:any;
  LOGINTIME:any;
  timelogin:any;
  ngOnInit() {
  }

  ngAfterViewInit()
  {
      this._script.loadScripts('.m-grid.m-grid--hor.m-grid--root.m-page',
          ['assets/snippets/custom/pages/user/login.js']);
      Helpers.bodyClass('m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default');

  }
  checkCapsLock(e: any) 
  {
      var capsLockON;
      var keyCode = e.keyCode ? e.keyCode : e.which;
      var shiftKey = e.shiftKey ? e.shiftKey : ((keyCode == 16) ? true : false);

      if (((keyCode >= 65 && keyCode <= 90) && !shiftKey) || ((keyCode >= 97 && keyCode <= 122) && shiftKey)) {
          capsLockON = true;
      } else {
          capsLockON = false;
      }
      if (capsLockON) {
        this.show=true;
      } else
      this.show=false;
  };

  clear(val)
  {
    if(val == '')
    {
      this.show=false;
    }
  }
  //delete
  //punching
  login()
  {
    this.action="validateLogin";
    this.punchingservice.newloginuser(this.users.username,this.users.password,this.action).subscribe((data: any) => 
    {
      this.data=data;
      
      console.log(data);
      this.validUser=this.data['validuser'];
      if( this.validUser == undefined || this.validUser == false)
      {
        this.validUSER=true;
      }
      else
      {
        this.validUSER=false;
      }
      this.status=this.data['status'];
      console.log(this.status);
      this.userdetails=JSON.parse(this.data['userdetails']);
      this.admin=this.data['isAdmin'];
      this.LOGINTIME=new Date().getTime();
      console.log(this.userdetails);      
      if(this.validUser)
      {
        localStorage.setItem('fullname',this.userdetails.fullname);
        localStorage.setItem('emailid',this.userdetails.username);
        localStorage.setItem('status',this.status);
        localStorage.setItem('admin',this.admin);       
        localStorage.setItem('logintime',this.LOGINTIME);
        this.punchingservice.setLoggedin();
        this.router.navigate(['/index/punching']);
      }
    });
  }





}
