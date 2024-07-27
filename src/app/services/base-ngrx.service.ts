import { HttpClient } from "@angular/common/http";
import { Selector, Store } from "@ngrx/store";
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
    public select<T extends AppState, R>(selector: Selector<T, R>): Observable<R> {
        return this.store.select(selector);
    }

    /**
     * Select from store once then complete.
     * @see {Store.select}
     */
    public selectOnce<T extends AppState, R>(selector: Selector<T, R>, skipNull: boolean = true): Observable<R> {
        return this.select(selector).pipe(take(1));
    }

    public selectApiVersion(): Observable<string> {
        const selectApiVer = (s: AppState): string => s.apiVersion
        return this.store.select(selectApiVer)
    }

    public selectApiVersionOnce(): Observable<string> {
        return this.selectApiVersion()
            .pipe(take(1))
    }

    public withApiVersion<T>(project: (apiVersion: string) => ObservableInput<T>): Observable<T> {
        return this.selectApiVersionOnce()
            .pipe(switchMap(project));
    }
}
