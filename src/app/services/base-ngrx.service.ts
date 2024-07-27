import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable, take, ObservableInput, switchMap } from "rxjs";
import { AppState } from "../store/app.state";

export abstract class BaseNgrxService {

    protected constructor(
        protected readonly http: HttpClient,
        protected readonly store: Store<AppState>
    ) {
    }

    /**
    * Select from store (streaming).
    * @see {Store.select}
    */
    public select<R>(selector: (state: AppState) => R): Observable<R> {
        return this.store.select(selector);
    }

    /**
     * Select from store once then complete.
     * @see {Store.select}
     */
    public selectOnce<R>(selector: (state: AppState) => R, skipNull: boolean = true): Observable<R> {
        return this.select(selector).pipe(take(1));
    }

    public selectApiVersion(): Observable<string> {
        return this.select((s: AppState) => s.apiVersion || 'v1');
    }

    public selectApiVersionOnce(): Observable<string> {
        return this.selectApiVersion().pipe(take(1));
    }

    public withApiVersion<T>(project: (apiVersion: string) => ObservableInput<T>): Observable<T> {
        return this.selectApiVersionOnce().pipe(switchMap(project));
    }
}
