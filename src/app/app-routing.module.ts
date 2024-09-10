import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeManageComponent } from './components/employee-manage/employee-manage.component';
import { authGuard } from './auth.guard';
import { userRoleAuthGuard } from './user-role-auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'employees',
        component: EmployeesComponent,
        canActivateChild: [userRoleAuthGuard],
      },
      {
        path: 'manage-employee',
        component: EmployeeManageComponent,
        canActivateChild: [userRoleAuthGuard],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
