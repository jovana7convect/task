import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable, of} from "rxjs";
import {Task} from "src/app/models/task.model";
import {Store} from "@ngrx/store";
import {BaseNgrxService} from "src/app/services/base-ngrx.service";
import {AppState} from "src/app/store/app.state";
import {tasksVersion1, tasksVersion2} from "../task-constants";

@Injectable()
export class TaskOverviewService extends BaseNgrxService {

  constructor(http: HttpClient, store: Store<AppState>) {
    super(http, store)
  }

  /**
   * Mocked version
   * Depending on the api version used, show different lists
   * Checkout the "of" operator at https://www.learnrxjs.io/learn-rxjs/operators/creation/of
   */

  public getTasks(apiVersion: string): Observable<Task[]> {
    if (apiVersion === "v1") return of(tasksVersion1)
    return of(tasksVersion2)
  }

  /**
   * The bellow shows how the actual HTTP call would look like
   * Taking in account the apiVersion
   */
  // public getTasks(apiVersion: string): Observable<Task[]> {
  //   return this.http
  //     .get<Task[]>(`baseApiUrl/${apiVersion}/tasks`)
  // }

}
