import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort"
import {TaskOverviewService} from "./task-overview.service";
import {taskOverviewResolve} from "./task-overview.resolve";
import {MatIconModule} from "@angular/material/icon";
import {TaskOverviewComponent} from "./task-overview.component";
import {StatusIconDirective} from "../../directives/status-icon/status-icon.directive";


const ROUTES: Routes = [
  {
    path: "",
    component: TaskOverviewComponent,
    resolve: {
      storeData: taskOverviewResolve
    }
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    StatusIconDirective
  ],
  declarations: [
    TaskOverviewComponent
  ],
  providers: [
    TaskOverviewService
  ]
})

export class TaskOverviewModule {
}
