import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./_services/script-loader.service";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { InterviewModule } from './theme/components/interviewform/interview.module';
import { InternalModule } from './theme/components/internal.module';
import { PunchingService } from './_services/punching.service';
import { LeaveService } from './_services/leave.service';
import { UsersService } from './_services/users.service';
import { AccessrequestService } from './_services/accessrequest.service';
import { InventoryService } from './_services/inventory.service';
import { LicenseserviceService } from './_services/licenseservice.service';
// import { AuthModule } from "./auth/auth.module";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ThemeComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ThemeRoutingModule,
        InterviewModule,
        InternalModule,
        HttpClientModule,
    ],
    providers: [ScriptLoaderService,PunchingService,LeaveService,UsersService,AccessrequestService,InventoryService,LicenseserviceService],
    bootstrap: [AppComponent]
})
export class AppModule { }