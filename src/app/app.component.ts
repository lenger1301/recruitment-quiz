import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  isNotLogin = false;

  constructor(private userServie: UserService) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.isNotLogin = true;
    }
  }

  logout() {
    this.isNotLogin = true;
    this.userServie.logout();
  }
}
