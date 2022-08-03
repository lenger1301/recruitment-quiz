import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] | undefined;

  displayedColumns: string[] = ['index', 'firstName', 'lastName', 'email', 'action'];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.listUser();
  }

  submit() {
    this.router.navigateByUrl('/');
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      alert('Delete successfully');
      this.listUser();
    });
  }

  listUser() {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }
}
