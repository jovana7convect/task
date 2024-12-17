import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksModule } from './tasks/tasks.module';

const ROUTES: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./tasks/tasks.module').then((m) => m.TasksModule),
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES), TasksModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
