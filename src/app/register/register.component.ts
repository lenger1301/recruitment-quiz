import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null),
    email: new FormControl(null),
    password: new FormControl(null),
    confirmPassword: new FormControl(null)
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.registerForm.valid) {
      if(this.checkMismatchPassword(this.registerForm.value.password, this.registerForm.value.confirmPassword)) {
        console.log("Password doesn't match");
        return;
      }
      this.userService.addUser(this.registerForm.value).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/home');
      });
    } else {
      console.log("Please input the required field");
    }
  }

  checkMismatchPassword(password: string, confirmPassword: string): boolean {
    if(this.registerForm.value.password != this.registerForm.value.confirmPassword) {
      return true;
    }
    return false;
  }
}
