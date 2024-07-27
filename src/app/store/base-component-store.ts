import { ComponentStore } from "@ngrx/component-store"
import { Comparer, createEntityAdapter, EntityAdapter, EntityState, IdSelector } from "@ngrx/entity"
import { EMPTY, isObservable, Observable, ObservableInput, OperatorFunction, pipe, skipUntil } from "rxjs"
import { map, shareReplay } from "rxjs/operators"
import { ActivatedRoute, ResolveFn, Router } from "@angular/router"
import { EnvironmentInjector, inject, runInInjectionContext } from "@angular/core"
import { BaseNgrxService } from "../services/base-ngrx.service"


interface IdentifiedFn {
    id: string,
    fn: () => unknown
}


export interface BaseEntityAdapter<T, ID extends string | number = string> extends EntityAdapter<T> {
    selectIds: OperatorFunction<EntityState<T>, ID[]>
    selectEntities: OperatorFunction<EntityState<T>, Record<ID, T>>
    selectAll: OperatorFunction<EntityState<T>, T[]>
    selectTotal: OperatorFunction<EntityState<T>, number>
    selectById: (id: ID) => OperatorFunction<EntityState<T>, T | null>
}


export abstract class BaseComponentStore<S extends object> extends ComponentStore<S> {

    public readonly apiVersion$: Observable<string>;

    protected readonly injector: EnvironmentInjector
    protected readonly activatedRoute: ActivatedRoute
    protected readonly router: Router

    protected constructor(parentOrService?: BaseNgrxService | BaseComponentStore<any>
    ) {
        super()

        this.injector = inject(EnvironmentInjector)
        this.activatedRoute = inject(ActivatedRoute)
        this.router = inject(Router)

        if (parentOrService instanceof BaseNgrxService) {
            this.apiVersion$ = parentOrService
                .selectApiVersion()
                .pipe(shareReplay(1))
        } else if (!!parentOrService) {
            this.apiVersion$ = parentOrService.apiVersion$
        } else {
            this.apiVersion$ = EMPTY
        }
    }


    protected createEntityAdapter<T extends { uuid: string | null }>(sortComparer?: Comparer<T>): BaseEntityAdapter<T> {
        return this.createCustomIdEntityAdapter<T>(e => e.uuid!!, sortComparer)
    }


    protected createCustomIdEntityAdapter<T, ID extends string | number = string>(
        selectId: IdSelector<T>,
        sortComparer?: Comparer<T>
    ): BaseEntityAdapter<T, ID> {
        const adapter = createEntityAdapter<T>({ selectId, sortComparer })
        const selectors = adapter.getSelectors()

        const selectIds = map(selectors.selectIds)
        const selectEntities = map(selectors.selectEntities)
        const selectAll = map(selectors.selectAll)
        const selectTotal = map(selectors.selectTotal)
        const selectById = (id: ID) => pipe(selectEntities, map(dict => dict[id] ?? null))

        return {
            ...adapter,
            selectIds,
            selectEntities,
            selectAll,
            selectTotal,
            selectById
        } as BaseEntityAdapter<T, ID>
    }

    /**
     * Runs the given resolve fn in context of the current route.
     * @protected
     */
    protected runResolve<R>(resolve: ResolveFn<R>): ObservableInput<R> {
        const routerStateSnapshot = this.router.routerState.snapshot
        const route = this.activatedRoute.firstChild?.snapshot ?? this.activatedRoute.snapshot

        const resolved = runInInjectionContext(this.injector, () => resolve(route, routerStateSnapshot))
        return !!resolved && (isObservable(resolved) || typeof (resolved as Promise<unknown>).then === "function")
            ? resolved as ObservableInput<R>
            : [resolved] as ObservableInput<R>
    }
}
