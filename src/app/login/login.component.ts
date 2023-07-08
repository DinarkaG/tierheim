import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {LoginService} from '../login.service';

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
    // Make an API request to authenticate the user
    const url = '/api/login'; // Replace with your backend API URL
    const body = { username: this.username, password: this.password };

    this.http.post(url, body)
      .subscribe(
        (response: any) => {
          if (response.success) {
            // Login successful, redirect the admin to the page where they can modify the tier table
            const adminId = response.adminId;
            this.router.navigate(['/admin']);
            console.log('eingeloggt'); // Replace '/admin' with the appropriate route
          } else {
            // Invalid username or password, handle the error
          }
        },
        error => {
          console.error('Error during login:', error);
          // Handle the error
        }
      );
  }
}
