import { LOCALE_ID, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { matPaginatorDefaultOptionsFactory } from './core/factories/mat-paginator-default';
import { matPaginatorIntlNlFactory } from './core/factories/mat-paginator';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  public static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: AppModule,
      providers: [
        { provide: MAT_PAGINATOR_DEFAULT_OPTIONS, useFactory: matPaginatorDefaultOptionsFactory },
        { provide: MatPaginatorIntl, useFactory: matPaginatorIntlNlFactory },
      ]
    };
  }

}
