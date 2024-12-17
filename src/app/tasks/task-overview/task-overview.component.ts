import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { TasksOverviewStore } from './task-overview.store';
import { takeUntil } from 'rxjs/operators';
import { BaseComponentStore } from '../../store/base-component-store';

export interface Task {
  name: string;
  finished: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TasksOverviewStore],
})
export class TaskOverviewComponent
  extends BaseComponentStore<TaskOverviewComponent>
  implements OnInit
{
  public readonly baseLink = '/edit';

  public readonly dataSource = new MatTableDataSource<Task>([]);
  public readonly displayedColumns: string[] = ['name', 'dueDate', 'finished'];

  @ViewChild(MatSort, { static: true })
  public sort!: MatSort;
  @ViewChild(MatPaginator, { static: true })
  public paginator!: MatPaginator;

  constructor(public readonly store: TasksOverviewStore) {
    super();
  }

  public ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    /**
     * Subscribing to the store data
     * Only until the component is active
     * After it is destroyed, do not listen anymore to the observable output
     */
    this.store.tasks$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  public onOptionSelected(version: string) {
    this.store.setAppVersion(version);
  }
}
