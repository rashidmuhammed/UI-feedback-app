import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { UserAuthService } from '../../services/user-auth.service';
import { UserModelComponent } from '../../dialoges/user-model/user-model.component';
import { MatDialog } from '@angular/material/dialog';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserAuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees(this.pageIndex, this.pageSize);
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
    throw new Error('Method not implemented.');
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
