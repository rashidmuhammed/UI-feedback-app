import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { UserAuthService } from '../../services/user-auth.service';
import { UserModelComponent } from '../../dialoges/user-model/user-model.component';
import { MatDialog } from '@angular/material/dialog';
import { AssignModelComponent } from '../../dialogs/assign-model/assign-model.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role', 'feedbac', 'actions'];
  dataSource: User[] = [];
  totalItems: number = 0;
  pageSize = 10;
  pageIndex = 0;
  public employees: User[] = [];
  public id: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserAuthService,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadEmployees(this.pageIndex, this.pageSize);
    this.getAllUsers();

    this.id = this.userService.getCurrentUserId();
  }

  //for get all users
  getAllUsers() {
    this.userService.getAllusers().subscribe({
      next: (user) => {
        console.log(user);
        this.employees = user;
      },
    });
  }
  //for pagination
  loadEmployees(pageIndex: number, pageSize: number): void {
    this.userService.getEmployees(pageIndex + 1, pageSize).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataSource = data.users;
        this.totalItems = data.totalUsers;
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees(this.pageIndex, this.pageSize);
  }

  assignUser(_t23: any) {
    const dialogRef = this.dialog.open(AssignModelComponent, {
      width: '400px',
      data: { employees: this.employees },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Call API to save the assignment
        this.assignEmployees(this.id, result.assignedTo, result.employees);
      }
    });
  }

  assignEmployees(id: string, assignedTo: string, employees: string[]) {
    this.userService
      .assignEmployees(id, assignedTo, employees)
      .subscribe((response) => {
        this.toaster.success('successfully assigned ');
        // Handle the response after assignment is successful
      });
  }

  //using same model for both edit and add
  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserModelComponent, {
      width: '400px',
      data: user ? { user } : {}, // If user is provided, pass it to the form
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEmployees(this.pageIndex, this.pageSize); // Refresh the list after add/edit
      }
    });
  }
}
