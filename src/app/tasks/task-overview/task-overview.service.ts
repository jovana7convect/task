import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {iif, Observable} from "rxjs";
import { Task } from "../task-overview/task-overview.component";


@Injectable()
export class TaskOverviewService {

    constructor(private readonly http: HttpClient) {
    }

    public getTasks(): Observable<Task[]> {
        return this.http
            .get<Task[]>("/api/tasks")
    }
}
