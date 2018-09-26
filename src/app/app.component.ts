import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from "./helpers";
import { ScriptLoaderService } from './_services/script-loader.service';
import { interval } from 'rxjs/observable/interval';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit,AfterViewInit {
    title = 'app';
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';

    constructor(private _router: Router,private _script: ScriptLoaderService) {
    }

    ngOnInit() {
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
            }
        });
        this.myFunction();
    }

    ngAfterViewInit()
    {
        this._script.loadScripts('body', ['assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js','assets/app/js/dashboard.js']);
    }

    checkInterval ()
    { 
        let loginTime = Number(localStorage.getItem('logintime'));     
        let currentTime = new Date().getTime();
        var interval=currentTime-loginTime;
        if (interval > 30*60*1000)
        {
            localStorage.clear();
            this._router.navigate(['','login']);
        }
    }
    myFunction() {
        setInterval(() => { this.checkInterval(); }, 1000 * 60 * 1);
    }
}