import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { iif, Observable } from "rxjs";
import { Task } from "src/app/models/task.model";
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
                .put<Task>(`https://api.mocki.io/v2/6glkc4fj/api/${apiVersion}/tasks/task/${task.uuid}`, task),
            this.http
                .post<Task>(`https://api.mocki.io/v2/6glkc4fj/api/${apiVersion}/tasks`, task)
        )
    }

    public getTask(
        apiVersion: string,
        taskId: string
    ): Observable<Task> {
        return this.http
            .get<Task>(`https://api.mocki.io/v2/6glkc4fj/api/${apiVersion}/tasks/task/${taskId}`)
    }

    public deleteTask(
        apiVersion: string,
        taskId: string
    ): Observable<void> {
        return this.http
            .delete<void>(`https://api.mocki.io/v2/6glkc4fj/api/${apiVersion}/tasks/task/${taskId}`)
    }
}
