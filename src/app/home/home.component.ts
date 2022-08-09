import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddUserComponent } from '../add-user/add-user.component';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users: User[] | undefined;
  disabled!: boolean;
  private header = 'Bearer ' + localStorage.getItem('token');
  private headers = new HttpHeaders().set('Authorization', this.header);

  usersDisplay: string[] = [
    'index',
    'firstName',
    'lastName',
    'email',
    'role',
    'action',
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listUser();
  }

  submit() {
    this.router.navigateByUrl('/');
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id, this.headers).subscribe(() => {
      alert('Delete successfully');
      this.listUser();
    });
  }

  listUser() {
    this.userService.getUsers(this.headers).subscribe((data) => {
      this.users = data;
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.listUser();
    });
  }

  openUpdateDialog(row: any) {
    const dialogRef = this.dialog.open(UpdateComponent, { data: row });

    dialogRef.afterClosed().subscribe((result) => {
      this.listUser();
    });
  }

  isUpdateDisabled(user: User): boolean {
    let role: string;
    let disable: boolean;
    if (JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'ADMIN') {
      Object.entries(user.userRoleId!).forEach(([key, value]) => {
        if (key == 'name') {
          role = value;
          if (user.email != JSON.parse(localStorage.getItem('user')!).email && role == 'ADMIN') {
            disable = true;
          } else {
            disable = false;
          }
        }
      });
      return disable!;
    } else if(JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'RECRUITER') {
      Object.entries(user.userRoleId!).forEach(([key, value]) => {
        if (key == 'name') {
          role = value;
          if ((user.email == JSON.parse(localStorage.getItem('user')!).email && role == 'RECRUITER') ||
          (user.email != JSON.parse(localStorage.getItem('user')!).email && role == 'CANDIDATE')) {
            disable = false;
          } else {
            disable = true;
          }
        }
      });
      return disable!;
    } else {
      return true;
    }
  }

  isDeleteDisabled(user: User): boolean {
    let role: string;
    let disable: boolean;
    if (JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'ADMIN') {
      Object.entries(user.userRoleId!).forEach(([key, value]) => {
        if (key == 'name') {
          role = value;
          if (
            user.email != JSON.parse(localStorage.getItem('user')!).email &&
            role == 'ADMIN'
          ) {
            disable = true;
          } else {
            disable = false;
          }
        }
      });
      return disable!;
    } else if (JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'RECRUITER') {
      Object.entries(user.userRoleId!).forEach(([key, value]) => {
        if (key == 'name') {
          role = value;
          if (user.email != JSON.parse(localStorage.getItem('user')!).email && role == 'RECRUITER'
          || user.email == JSON.parse(localStorage.getItem('user')!).email && role == 'RECRUITER') {
            disable = true;
          } else if (user.email != JSON.parse(localStorage.getItem('user')!).email && role != 'CANDIDATE') {
            disable = true;
          }
        }
      });
      return disable!;
    }
    return true;
  }

  ifNotAdmin(): boolean {
    if (JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'ADMIN') {
      return false;
    } else if (JSON.parse(localStorage.getItem('user')!).userRoleId.name == 'RECRUITER') {
      return false;
    }
    return true;
  }
}
