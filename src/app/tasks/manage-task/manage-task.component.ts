import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, mergeMap, takeUntil } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ManageTaskStore } from "./manage-task.store";
import { Task } from "src/app/models/task.model";

@Component({
    selector: "app-manage-task",
    templateUrl: "./manage-task.component.html",
    styleUrls: ["./manage-task.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ManageTaskStore]
})
export class ManageTaskComponent {
    public readonly pageTitle$ = this.store.taskIsNew$
        .pipe(mergeMap(isNew => isNew
            ? ["New task"]
            : this.store.task$.pipe(map(t => `Edit task: ${t?.name}`))));

    public readonly editorActive$ = new BehaviorSubject(false);

    public readonly formGroup: FormGroup = new FormGroup({
        uuid: new FormControl<string | null>(null),
        name: new FormControl<string>("", [Validators.required]),
        finished: new FormControl<boolean>(false, [Validators.required])
    })

    private readonly componentDestroyed$: Subject<void> = new Subject();

    constructor(
        public readonly store: ManageTaskStore,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.store.taskIsNew$
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(isNew => this.editorActive$.next(isNew))

        this.store.task$
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(t => {
                if (t) this.formGroup.patchValue(t);
            });
    }

    public onEnableEdit() {
        this.editorActive$.next(true);
    }

    public onCancelEdit() {
        this.editorActive$.next(false);

        // Optimize this subscription
        this.store.task$.subscribe(t => {
            if (t) this.formGroup.patchValue(t);
        });
    }

    public onFormSubmit() {
        if (this.formGroup.invalid) return;
        const Task = this.formGroup.getRawValue();

        this.editorActive$.next(false);

        // Optimize this subscription
        this.store.saveTask(Task)
            .subscribe((t: Task) => {
                this.router.navigate(["..", t.uuid], {
                    relativeTo: this.activatedRoute,
                    replaceUrl: true
                });
            });
    }

    public deleteTask() {
        this.store.deleteTask()
            .subscribe(() => {
                this.router.navigate(["../../overview"],
                    { relativeTo: this.activatedRoute, replaceUrl: true })
            })
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}
