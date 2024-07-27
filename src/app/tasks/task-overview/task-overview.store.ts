import {Injectable} from "@angular/core"
import {createEntityAdapter, EntityState} from "@ngrx/entity"
import {Observable} from "rxjs"
import {map, mergeMap, takeUntil, tap} from "rxjs/operators"
import { Task } from "./task-overview.component"
import { TaskOverviewService } from "./task-overview.service"


interface TaskStoreState {
    tasks: EntityState<Task>
}

export interface TaskStoreData {
    tasks: Task[]
}

@Injectable()
export class TasksOverviewStore {

    private readonly TasksAdapter = createEntityAdapter<Task>();
    private readonly TasksSelectors = this.TasksAdapter.getSelectors();
    public readonly Tasks$: Observable<Task[]> = this
        .select(s => s.Tasks)
        .pipe(map(this.TasksSelectors.selectAll));

    constructor(service: TaskOverviewService) {
        super(service)

        this.setState({
            Tasks: this.TasksAdapter.getInitialState()
        })

        this.activatedRoute.data
            .pipe(takeUntil(this.destroy$), map(d => d.storeData))
            .subscribe((sd: TasksStoreData) => this.setStoreData(sd))

    }

    public refresh: () => void = this.effect($ => $.pipe(
        mergeMap(() => this.runResolve(taskOverviewResolve)),
        tap((sd: TasksStoreData) => this.setStoreData(sd))
    ))

    public setStoreData(data: TasksStoreData) {
        this.patchState(s => ({
            tasks: this.TasksAdapter.setAll(data.tasks, s.tasks)
        }))
    }

}
