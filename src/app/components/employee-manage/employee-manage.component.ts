import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrl: './employee-manage.component.css',
})
export class EmployeeManageComponent implements OnInit {
  employee: User[] = [];
  public currentUserId: string = '';
  public userAssignedToId: string = '';
  public userNeedtoFeedBac: User[] = [];

  constructor(private userService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUserId = this.userService.getCurrentUserId();
    this.getTask();
  }

  getTask() {
    this.userService.fetchEmployeeFeedbackId(this.currentUserId).subscribe({
      next: (user) => {
        this.userAssignedToId = user.assignedTo?.[0];

        if (this.userAssignedToId) {
          this.userService.getUserById(this.userAssignedToId).subscribe({
            next: (assignedUser) => {
              console.log(assignedUser);
              this.userNeedtoFeedBac.push(assignedUser);
            },
            error: (err) => {
              console.error('Error fetching user by ID:', err);
            },
          });
        } else {
          console.warn('No user assigned to this task.');
        }
      },
      error: (err) => {
        console.error('Error fetching employee feedback ID:', err);
      },
    });
  }

  addFeedback(id: any) {
    this.router.navigate(['home/feedbac', id]);
  }
}
