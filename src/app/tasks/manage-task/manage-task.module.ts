import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";

import {ManageTaskComponent} from "./manage-task.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ManageTaskService} from "./manage-task.service";
import {manageTaskResolve} from "./manage-task.resolve";
import {NotPipeModule} from "src/app/pipes/not-pipe/not-pipe.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DatePickerComponent} from "../../shared/datepicker/datepicker.component";
import {StatusIconDirective} from "../../directives/status-icon/status-icon.directive";

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
    MatSelectModule,
    MatIconModule,
    NotPipeModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    DatePickerComponent,
    StatusIconDirective,
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
