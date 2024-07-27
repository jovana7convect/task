import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";

import {TasksOverviewStore} from "./task-overview.store";

export interface Task {
    uuid: string | null;
    name: string;
    finished: boolean;
}

@Component({
    selector: "app-task-overview",
    templateUrl: "./tasks-overview.component.html",
    styleUrls: ["./tasks-overview.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TasksOverviewStore]
})
export class TaskOverviewComponent implements OnInit {

    public readonly baseLink = "/api/tasks/edit/";

    public readonly dataSource = new MatTableDataSource<Task>([]);
    public readonly displayedColumns: string[] = [
        "name", "finished"
    ];


    constructor(public readonly store: TasksOverviewStore) {}

    public ngOnInit() {

        /**
         * Optimize this subscription.
         */

        this.store.Tasks$
            .subscribe(data => {
                this.dataSource.data = data
            });

    }


}
