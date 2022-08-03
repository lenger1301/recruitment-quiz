import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(data => {
        if(data == null) {
          alert('Something went wrong');
          return;
        }
        this.router.navigateByUrl('/home');
      })
    }
  }
}
