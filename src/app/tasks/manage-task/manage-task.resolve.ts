import { forkJoin, Observable, ObservableInput } from "rxjs"
import { inject } from "@angular/core"
import { ActivatedRouteSnapshot } from "@angular/router"
import { ForkJoinSource } from "src/app/rxjs/util"
import { Task } from "../task-overview/task-overview.component"
import { ManageTaskService } from "./manage-task.service"
import { ManageTaskStoreData } from "./manage-task.store"


export const manageTaskResolve = (route: ActivatedRouteSnapshot): Observable<ManageTaskStoreData> => {
    const service = inject(ManageTaskService)
    const taskId = route.paramMap.get("taskId");

    const newTask = (): Task => {
        return {
            uuid: null,
            name: "",
            finished: true
        }
    }

    return service.withApiVersion(apiVersion => {
        const task: ObservableInput<Task> = taskId === "new"
            ? [newTask()]
            : service.getTask(apiVersion, taskId!!)

        const sources: ForkJoinSource<ManageTaskStoreData> = {
            task
        }
        return forkJoin(sources)
    })

}
