import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { InterviewModule } from './theme/components/interviewform/interview.module';
// import { LogoutComponent } from "./auth/logout/logout.component";

const routes: Routes = [
    {
        path: "login",
        loadChildren: () => LoginModule,
    },
    {
        path: "interviewform",
        loadChildren: () => InterviewModule,
    },
    { 
        path: 'logout', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: '', 
        redirectTo: 'index/punching', 
        pathMatch: 'full' 
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }