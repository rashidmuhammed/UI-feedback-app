import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
@Component({
  selector: 'app-assign-model',
  templateUrl: './assign-model.component.html',
  styleUrl: './assign-model.component.css',
})
export class AssignModelComponent {
  employees: User[] = [];
  selectedEmployee: string = '';
  selectedEmployees: string[] = [];
  isAssignDisabled: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AssignModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employees = this.data.employees;
    console.log(this.employees);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAssign(): void {
    if (this.selectedEmployee && this.selectedEmployees.length > 0) {
      this.dialogRef.close({
        assignedTo: this.selectedEmployee,
        employees: this.selectedEmployees,
      });
    } else {
      alert(
        'Please select an employee to assign and at least one employee for feedback.'
      );
    }
  }
  checkSelection(): void {
    console.log(this.selectedEmployee);
    console.log(this.selectedEmployees);
    this.isAssignDisabled = !(
      this.selectedEmployee && this.selectedEmployees.length > 0
    );
  }
}
