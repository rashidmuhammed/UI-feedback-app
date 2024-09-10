import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeManageComponent } from './components/employee-manage/employee-manage.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Default route for login
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'manage-employee', component: EmployeeManageComponent }, // Child route under 'home'
    ],
  },
  { path: '**', redirectTo: '' }, // Wildcard route for handling unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
