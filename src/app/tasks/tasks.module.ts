import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";


const ROUTES: Routes = [
    {
        path: "overview",
        loadChildren: () => import("./task-overview/task-overview.module").then(m => m.TaskOverviewModule)
    },
    {
        path: "edit/:taskId",
        loadChildren: () => import("./manage-task/manage-task.module").then(m => m.ManageTaskModule)
    },
    {
        path: "",
        redirectTo: "overview",
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})

export class TasksModule {
}
