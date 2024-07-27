import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskOverviewModule } from './tasks/task-overview/task-overview.module';
import { ManageTaskModule } from './tasks/manage-task/manage-task.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    AppRoutingModule,
    TaskOverviewModule,
    ManageTaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
