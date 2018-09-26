import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { InternalModule } from './components/internal.module';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthGuard } from '../_guards';
// import { AuthGuard } from "../auth/_guards/auth.guard";

const routes: Routes = [
    {
        "path": "",
        "component": ThemeComponent,
        "canActivate": [AuthGuard],
        "children": [
            {
                path: "index",
                loadChildren: () => InternalModule,
            },
            {
                path: "404",
                loadChildren:  () => NotFoundModule,
                
            },
            {
                path: "",
                "redirectTo": "index",
                "pathMatch": "full"
            }
        ]
    },
    
    
    {
        "path": "**",
        "redirectTo": "404",
        "pathMatch": "full"
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ThemeRoutingModule { }