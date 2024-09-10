import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private userService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.userService.userLogin(loginData).subscribe({
        next: (response: any) => {
          const accessToken = response.accessToken;

          localStorage.setItem('accessToken', accessToken);
          this.route.navigate(['/home/employees']);

          console.log('Login successful', response);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
