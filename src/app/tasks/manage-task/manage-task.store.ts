import { Injectable } from "@angular/core"
import { map, mergeMap, switchMap, take, takeUntil, tap, withLatestFrom } from "rxjs/operators"
import { Observable } from "rxjs";

import { ManageTaskService } from "./manage-task.service";
import { Task } from "../task-overview/task-overview.component";
import { BaseComponentStore } from "src/app/store/base-component-store";

interface ManageTaskStoreState {
    task: Task | null
}

export interface ManageTaskStoreData {
    task: Task
}

@Injectable()
export class ManageTaskStore extends BaseComponentStore<ManageTaskStoreState> {

    public readonly task$: Observable<Task | null> = this.select(s => s.task);
    public readonly taskId$: Observable<string | null> = this.select(s => s.task?.uuid || null);
    public readonly taskIsNew$: Observable<boolean> = this.taskId$.pipe(map(id => !id));

    constructor(private readonly service: ManageTaskService) {
        super(service)

        this.setState({
            task: null
        })

        this.activatedRoute.data
            .pipe(takeUntil(this.destroy$), map(d => d["storeData"]))
            .subscribe(data => this.setStoreState(data))
    }

    public setStoreState(data: ManageTaskStoreData) {
        this.patchState(() => ({
            task: data.task
        }));
    }

    public saveTask(task: Task): Observable<Task> {
        return this.apiVersion$.pipe(
            take(1),
            switchMap(apiVersion =>
                this.service.saveTask(apiVersion, task)),
            tap((t: Task) => this.patchState(() => ({ task: t })))
        )
    }

    public deleteTask(): Observable<void> {
        return this.taskId$.pipe(
            take(1),
            withLatestFrom(this.apiVersion$),
            mergeMap(([taskId, apiVersion]) =>
                this.service.deleteTask(apiVersion, taskId!!)),
            tap(() => this.patchState(() => ({
                task: null
            })))
        )
    }
}
