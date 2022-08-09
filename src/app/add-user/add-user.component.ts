import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
    roleId: new FormControl(null)
  });
  disableSelect = new FormControl(false);
  private header = "Bearer " + localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', this.header);

  constructor(private router: Router, private userService: UserService, private dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') == null) {
      this.router.navigateByUrl('/login');
      return;
    }
  }

  submit() {
    if(this.addUserForm.valid) {
      const formData = new FormData();
      formData.append('email', this.addUserForm.value.email);
      formData.append('firstName', this.addUserForm.value.firstName);
      formData.append('lastName', this.addUserForm.value.lastName);
      formData.append('password', this.addUserForm.value.password);
      formData.append('roleId', this.addUserForm.value.roleId);
      console.log(this.addUserForm.value);
      if(this.checkMismatchPassword()) {
        alert("Password doesn't match");
        return;
      }
      this.userService.addUser(formData, this.headers).subscribe({
        next: (): void => {
          this.addUserForm.reset();
          this.dialogRef.close('Successfully Updated');
        }
      });
    } else {
      console.log("Please input the required field");
    }
  }

  ifAdmin(): boolean {
    if(JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'ADMIN') {
      return false;
    }
    return true;
  }

  private checkMismatchPassword(): boolean {
    if(this.addUserForm.value.password != this.addUserForm.value.confirmPassword) {
      return true;
    }
    return false;
  }
}
