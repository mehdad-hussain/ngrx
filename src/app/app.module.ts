import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// prettier-ignore
import { DefaultDataServiceConfig, EntityDataModule, EntityDataService, } from '@ngrx/data';

// import: local files
import { environment } from '@environments';
import { envProd } from '@environments';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from '@admin';
import { HomeModule } from '@home';
import { BaseUrlInterceptor, ResponseInterceptor } from '@core';
// prettier-ignore
import { TodoEffects, todoReducer, AuthEffects, authReducer,EmployeeDataService ,counterReducer, COUNTER_STATE_NAME, EmployeeEffects, employeeReducer  } from '@store';
import { entityConfig } from './app-entity-metadata';

const customDataServiceConfig: DefaultDataServiceConfig = {
  root: 'admin/',
  timeout: 3000, // request timeout
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // step 1: StoreModule.forRoot(reducers),
    StoreModule.forRoot(
      { todo: todoReducer, auth: authReducer, employee: employeeReducer },
      {}
    ),
    EffectsModule.forRoot([TodoEffects, AuthEffects, EmployeeEffects]),
    // StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer),
    EntityDataModule.forRoot(entityConfig),

    //step 2: Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),

    HomeModule,
    AdminModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    // { provide: DefaultDataServiceConfig, useValue: customDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    entityService: EntityDataService,
    employeeDataService: EmployeeDataService
  ) {
    entityService.registerService('Employee', employeeDataService);
  }
}
