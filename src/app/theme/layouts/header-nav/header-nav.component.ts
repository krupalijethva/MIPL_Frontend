import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { PunchingService } from '../../../_services/punching.service';
import { Router } from '@angular/router';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

    fullname:String;
    emailid:String;
    username:any;
    constructor(private punchService:PunchingService,private router:Router) {

    }
    ngOnInit() {
        this.username=localStorage.getItem('currentUser');
        this.fullname=localStorage.getItem('fullname');
        this.emailid=localStorage.getItem('emailid');
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }
    logout()
    {
        this.punchService.logout();
        this.router.navigate(['']);
    }


}