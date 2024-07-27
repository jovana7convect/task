import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";

import {ManageTaskComponent} from "./manage-task.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ManageTaskService } from "./manage-task.service";
import { manageTaskResolve } from "./manage-task.resolve";

const ROUTES: Routes = [
    {
        path: "",
        component: ManageTaskComponent,
        resolve: {
            storeData: manageTaskResolve
        }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatMenuModule,
        MatOptionModule,
        MatSelectModule
    ],
    declarations: [
        ManageTaskComponent
    ],
    providers: [
        ManageTaskService
    ]
})

export class ManageTaskModule {
}
