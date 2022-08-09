import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null),
    newPassword: new FormControl(null),
    confirmNewPassword: new FormControl(null)
  });
  sendEmailForm = new FormGroup({
    email: new FormControl(null)
  });
  isHidden!: boolean;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isHidden = false;
  }

  submit() {
    if (this.resetPasswordForm.valid) {
      if(!this.checkMismatchPassword(this.resetPasswordForm.value.newPassword, this.resetPasswordForm.value.confirmNewPassword)) {
        const formData = new FormData();
        formData.append('email', this.resetPasswordForm.value.email);
        formData.append('currentPassword', this.resetPasswordForm.value.currentPassword);
        formData.append('newPassword', this.resetPasswordForm.value.newPassword);
        this.userService.resetPassword(formData).subscribe({
          next: (data) => {
            alert("Password changed successfully");
            this.router.navigateByUrl('/login');
          }
        });
      } else {
        alert("Password doesn't match");
      }
    }
  }

  submitEmail() {
    const formData = new FormData();
    formData.append('email', this.sendEmailForm.value.email!);
    this.userService.sendResetPasswordEmail(formData).subscribe({
      next: (data) => {
        this.isHidden = true;
        console.log(data);
      },
      error: (err) => {
        this.isHidden = false;
        alert(err);
      }
    });
  }

  checkMismatchPassword(newPassword: string, confirmNewPassword: string): boolean {
    if(this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.confirmNewPassword) {
      console.log(newPassword, confirmNewPassword);
      return true;
    }
    return false;
  }
}
