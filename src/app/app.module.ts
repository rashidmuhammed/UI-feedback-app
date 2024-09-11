import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../shared/material-module';
import { HomeComponent } from './components/home/home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeManageComponent } from './components/employee-manage/employee-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { UserAuthService } from './services/user-auth.service';
import { LoaderComponent } from './components/loader/loader.component';
import { AuthInterceptor } from './interceptors/auth.service';
import { UserModelComponent } from './dialoges/user-model/user-model.component';
import { AssignModelComponent } from './dialogs/assign-model/assign-model.component';
import { ToastrModule } from 'ngx-toastr';
import { FeedbacComponent } from './components/feedbac/feedbac.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EmployeesComponent,
    EmployeeManageComponent,
    LoaderComponent,
    UserModelComponent,
    AssignModelComponent,
    FeedbacComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()), // Use new method for configuring HttpClient
    UserAuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
