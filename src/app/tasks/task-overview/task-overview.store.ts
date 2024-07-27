import { Injectable } from "@angular/core"
import { EntityState } from "@ngrx/entity"
import { Observable } from "rxjs"
import { map, mergeMap, takeUntil, tap } from "rxjs/operators"
import { Task } from "src/app/models/task.model";
import { TaskOverviewService } from "./task-overview.service"
import { BaseComponentStore } from "src/app/store/base-component-store"
import { taskOverviewResolve } from "./task-overview.resolve"


interface TaskStoreState {
    tasks: EntityState<Task>
}

export interface TaskStoreData {
    tasks: Task[]
}

@Injectable()
export class TasksOverviewStore extends BaseComponentStore<TaskStoreState> {

    private readonly tasksAdapter = this.createEntityAdapter<Task>();
    private readonly tasksSelectors = this.tasksAdapter.getSelectors();
    public readonly tasks$: Observable<Task[]> = this
        .select(s => s.tasks)
        .pipe(map(this.tasksSelectors.selectAll));

    constructor(service: TaskOverviewService) {
        super(service)

        this.setState({
            tasks: this.tasksAdapter.getInitialState()
        })

        this.activatedRoute.data
            .pipe(takeUntil(this.destroy$), map(d => d["storeData"]))
            .subscribe((sd: TaskStoreData) => this.setStoreData(sd))

    }

    public refresh: () => void = this.effect($ => $.pipe(
        mergeMap(() => this.runResolve(taskOverviewResolve)),
        tap((sd: TaskStoreData) => this.setStoreData(sd))
    ))

    public setStoreData(data: TaskStoreData) {
        this.patchState(s => ({
            tasks: this.tasksAdapter.setAll(data.tasks, s.tasks)
        }))
    }

}
