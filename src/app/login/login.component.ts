import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {
    this.username = '';
    this.password = '';
  }

  onSubmit() {
    const url = '/api/login';
    const body = { username: this.username, password: this.password };

    this.http.post(url, body)
      .subscribe(
        (response: any) => {
          if (response.success) {
            const adminId = response.adminId;
            this.router.navigate(['/admin']);
            console.log('eingeloggt');
          } else {
          }
        },
        error => {
          console.error('Error during login:', error);
        }
      );
  }
}
