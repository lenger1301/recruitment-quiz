import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm = new FormGroup({
    currentEmail: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    roleId: new FormControl(''),
  });
  private header = "Bearer " + localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', this.header);

  constructor(private userService: UserService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<UpdateComponent>) {}

  ngOnInit(): void {
    if(localStorage.getItem('user') == null) {
      this.router.navigateByUrl('/login');
      return;
    }

    if(this.data) {
      this.updateForm.controls['currentEmail'].setValue(this.data.email);
      this.updateForm.controls['firstName'].setValue(this.data.firstName);
      this.updateForm.controls['lastName'].setValue(this.data.lastName);
      this.updateForm.controls['roleId'].setValue(this.data.userRoleId.id+'');
    }
  }

  submit() {
    if(this.updateForm.valid) {
      const formData = new FormData();
      formData.append('currentEmail', this.updateForm.value.currentEmail!);
      formData.append('firstName', this.updateForm.value.firstName!);
      formData.append('lastName', this.updateForm.value.lastName!);
      formData.append('roleId', this.updateForm.value.roleId!);
      this.userService.updateUser(formData, this.headers).subscribe({
        next: (): void => {
          this.updateForm.reset();
          this.dialogRef.close('Successfully Updated');
        }
      });
    } else {
      alert('Please input all required field');
    }
  }

  ifNotAdmin(): boolean {
    if(JSON.parse(localStorage.getItem('user')!).userRoleId.name == "ADMIN") {
      return false;
    }
    return true;
  }
}
