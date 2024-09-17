import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-feedbac',
  templateUrl: './feedbac.component.html',
  styleUrl: './feedbac.component.css',
})
export class FeedbacComponent implements OnInit {
  public feedback: string = '';
  feedbackId: string = '';

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private toast: ToastrService,
    private userService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: any) => {
      this.feedbackId = params['id'];
      console.log('Feedback ID:', this.feedbackId);
    });
  }

  onSubmit() {
    if (this.feedback.trim() === '') {
      alert('Please enter your feedback before submitting.');
      return;
    }

    // const updateFeedbacck = {
    //   feedbac: this.feedback,
    // };

    // this.userService.updateUser(updateFeedbacck, this.feedbackId);

    // this.toast.success('Feedback submitted:');

    this.feedback = '';
  }

  onCancel() {
    this.route.navigate(['home/manage-employee']);
  }
}
