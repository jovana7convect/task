import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { TasksOverviewStore } from "./task-overview.store";
import { Task } from "src/app/models/task.model";

@Component({
    selector: "app-task-overview",
    templateUrl: "./task-overview.component.html",
    styleUrls: ["./task-overview.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TasksOverviewStore]
})
export class TaskOverviewComponent implements OnInit {

    public readonly baseLink = "/edit/";

    public readonly dataSource = new MatTableDataSource<Task>([]);
    public readonly displayedColumns: string[] = [
        "name", "finished"
    ];


    constructor(public readonly store: TasksOverviewStore) { }

    public ngOnInit() {

        /**
         * Optimize this subscription.
         */

        this.store.tasks$
            .subscribe(data => {
                this.dataSource.data = data
            });

    }


}
