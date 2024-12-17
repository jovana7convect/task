import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif, Observable, of } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { BaseNgrxService } from 'src/app/services/base-ngrx.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { tasksVersion1, tasksVersion2 } from '../task-constants';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ManageTaskService extends BaseNgrxService {
  constructor(http: HttpClient, store: Store<AppState>) {
    super(http, store);
  }

  /**
   * Mocked version - just return the passed object
   */
  public saveTask(apiVersion: string, task: Task): Observable<Task> {
    console.log(task);
    // Only assign a UUID if it's missing
    if (!task.uuid) {
      task = { ...task, uuid: uuidv4() };
    }
    console.log(task);
    return of(task);
  }

  /**
   * The bellow shows how the actual HTTP call would look like
   * Check if task is new or existing and do the post/put based on that
   * Checkout the "iif" operator at https://www.learnrxjs.io/learn-rxjs/operators/conditional/iif
   */
  // public saveTask(
  //     apiVersion: string,
  //     task: Task
  // ): Observable<Task> {
  //     return iif(
  //         () => !!task.uuid,
  //         this.http
  //             .put<Task>(`baseApiUrl/${apiVersion}/tasks/${task.uuid}`, task),
  //         this.http
  //             .post<Task>(`baseApiUrl/${apiVersion}/tasks`, task)
  //     )
  // }

  /**
   * Mocked version - just return the passed object
   * Based on the apiVersion
   */
  public getTask(apiVersion: string, taskId: string): Observable<Task> {
    // After creating new task, this method will of course return undefined, because we have mocked data
    // Just press save 2 times, and it will be fine :)
    // @ts-ignore (do not practise this, this is just because we mocked data)
    return apiVersion === 'v1'
      ? of(tasksVersion1.find((t) => t.uuid === taskId))
      : of(tasksVersion2.find((t) => t.uuid === taskId));
  }

  /**
   * The bellow shows how the actual HTTP call would look like
   */
  // public getTask(
  //   apiVersion: string,
  //   taskId: string
  // ): Observable<Task> {
  //   return this.http
  //     .get<Task>(`baseApiUrl/${apiVersion}/tasks/${taskId}`)
  // }

  /**
   * Mocked version
   * of(void 0) creates an observable that immediately emits undefined and completes.
   */
  public deleteTask(apiVersion: string, taskId: string): Observable<void> {
    return of(void 0);
  }

  /**
   * The bellow shows how the actual HTTP call would look like
   */
  // public deleteTask(
  //   apiVersion: string,
  //   taskId: string
  // ): Observable<void> {
  //   return this.http
  //     .delete<void>(`baseApiUrl/${apiVersion}/tasks/${taskId}`)
  // }
}
