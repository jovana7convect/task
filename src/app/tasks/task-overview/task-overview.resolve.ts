import {inject} from "@angular/core"
import {forkJoin, Observable} from "rxjs"
import {ResolveFn} from "@angular/router";

import {TaskOverviewService} from "./task-overview.service"
import {TaskStoreData} from "./task-overview.store";
import {ForkJoinSource} from "src/app/rxjs/util";

export const taskOverviewResolve: ResolveFn<TaskStoreData> = (): Observable<TaskStoreData> => {
  const service = inject(TaskOverviewService)

  return service.withApiVersion(apiVersion => {
    const sources: ForkJoinSource<TaskStoreData> = {
      tasks: service.getTasks(apiVersion)
    }

    return forkJoin(sources)
  })

}
