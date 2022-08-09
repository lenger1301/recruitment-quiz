import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  });
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    if(this.userService.isLoggedInUser()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  submit(user: User): void {
    this.subscriptions.push(
      this.userService.login(user).subscribe({
        next: (response: HttpResponse<User>) => {
          const token = response.headers.get('Jwt-Token');
          this.userService.saveToken(token!);
          this.userService.addUserToLocalStorage(response.body!);
          this.router.navigateByUrl('/home');
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
