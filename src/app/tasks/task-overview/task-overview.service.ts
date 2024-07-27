import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { Task } from "src/app/models/task.model";
import { Store } from "@ngrx/store";
import { BaseNgrxService } from "src/app/services/base-ngrx.service";
import { AppState } from "src/app/store/app.state";


@Injectable()
export class TaskOverviewService extends BaseNgrxService {

    constructor(http: HttpClient, store: Store<AppState>) {
        super(http, store)
    }

    public getTasks(apiVersion: string): Observable<Task[]> {
        return this.http
            .get<Task[]>(`https://api.mocki.io/v2/6glkc4fj/api/${apiVersion}/tasks`)
    }

}
