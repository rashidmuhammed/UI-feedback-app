import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { UserAuthService } from '../../services/user-auth.service';

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

  constructor(private userService: UserAuthService) {}

  ngOnInit(): void {
    this.loadEmployees(this.pageIndex, this.pageSize);
  }
  //for pagination
  loadEmployees(pageIndex: number, pageSize: number): void {
    this.userService.getEmployees(pageIndex + 1, pageSize).subscribe({
      next: (data: any) => {
        console.log(data);
        this.dataSource = data.users;
        this.totalItems = data.totalCount;
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees(this.pageIndex, this.pageSize);
  }

  openAssignDialog(_t36: any) {
    throw new Error('Method not implemented.');
  }
  openAddEmployeeDialog() {
    throw new Error('Method not implemented.');
  }

  assignUser(_t23: any) {
    throw new Error('Method not implemented.');
  }
  editUser(_t23: any) {
    throw new Error('Method not implemented.');
  }
}
