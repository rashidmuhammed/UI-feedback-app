import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrl: './user-model.component.css',
})
export class UserModelComponent {
  userForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserAuthService,
    private dialogRef: MatDialogRef<UserModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.user; // If data.user exists, it's edit mode
    this.userForm = this.fb.group({
      name: [data.user ? data.user.name : '', Validators.required],
      role: [data.user ? data.user.role : '', Validators.required],
      feedbac: [data.user ? data.user.feedbac : ''],
      email: [
        data.user ? data.user.email : '',
        [Validators.required, Validators.email],
      ],
      password: [''],
    });
    if (!this.isEditMode) {
      this.userForm.get('password')?.setValidators([Validators.required]);
    }

    this.userForm.get('password')?.updateValueAndValidity();
  }

  onSave(): void {
    if (this.userForm.valid) {
      if (this.isEditMode) {
        // Call the edit API
        this.userService
          .updateUser(this.userForm.value, this.data.user._id)
          .subscribe(
            (User) => {
              console.log('User updated successfully:', User);
              this.dialogRef.close(true); // Close the dialog on success
            },
            (error) => console.error('Error updating user:', error)
          );
      } else {
        console.log(this.userForm.value);
        // Call the add API
        this.userService.createUser(this.userForm.value).subscribe(
          () => {
            this.dialogRef.close(true), console.log('o');
          },
          (error) => console.error('Error adding user:', error)
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
