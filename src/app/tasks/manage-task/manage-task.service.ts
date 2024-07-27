import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {iif, Observable} from "rxjs";
import { Task } from "../task-overview/task-overview.component";
import { BaseNgrxService } from "src/app/services/base-ngrx.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";


@Injectable()
export class ManageTaskService extends BaseNgrxService {

    constructor(http: HttpClient, store: Store<AppState>) {
        super(http, store)
    }

    public saveTask(
        apiVersion: string,
        task: Task
    ): Observable<Task> {
        return iif(
            () => !!task.uuid,
            this.http
            .put<Task>(`/api/${apiVersion}/tasks/task/${task.uuid}`, task),
            this.http
                .post<Task>("/api/tasks", task)
        )
    }

    public getTask(
        apiVersion: string,
        taskId: string
    ): Observable<Task> {
        return this.http
            .get<Task>(`/api/${apiVersion}/tasks/task/${taskId}`)
    }

    public deleteTask(
        apiVersion: string,
        taskId: string
    ): Observable<void> {
        return this.http
            .delete<void>(`/api/${apiVersion}/tasks/task/${taskId}`)
    }
}
