import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

import {TasksOverviewStore} from "./task-overview.store";

export interface Task {
    name: string;
    finished: boolean;
}

@Component({
    selector: "app-tasks",
    templateUrl: "./task-overview.component.html",
    styleUrls: ["./task-overview.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TasksOverviewStore]
})
export class TaskOverviewComponent implements OnInit {

    public readonly baseLink = "/api/tasks/edit/";

    public readonly dataSource = new MatTableDataSource<Task>([]);
    public readonly displayedColumns: string[] = [
        "name", "finished"
    ];

    @ViewChild(MatSort, { static: true })
    public sort!: MatSort;
    @ViewChild(MatPaginator, { static: true })
    public paginator!: MatPaginator;

    constructor(public readonly store: TasksOverviewStore) {
    }

    public ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        /**
         * Optimize this subscription.
         */

        this.store.tasks$
            .subscribe(data => {
                this.dataSource.data = data
            });

    }


}
