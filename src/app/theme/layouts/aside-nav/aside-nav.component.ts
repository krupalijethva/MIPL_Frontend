import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    isAdmin:boolean=false;
    admin:any;
    constructor() {

    }
    ngOnInit() {
        this.admin=localStorage.getItem('admin');
        if(this.admin === "true")
        {
          this.isAdmin=true;
        }
    }
    ngAfterViewInit() {

        mLayout.initAside();

    }

}