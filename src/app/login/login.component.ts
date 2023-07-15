import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  // Variablen
  username: string;
  password: string;

  // Konstruktor
  constructor(private http: HttpClient, private router: Router) {
    this.username = '';
    this.password = '';
  }

  onSubmit() { // Funktion zum Abgleichen der Login Daten
    const url = '/api/login';
    const body = { username: this.username, password: this.password };

    this.http.post(url, body)
      .subscribe(
        (response: any) => {
          if (response.success) {
            const adminId = response.adminId;
            this.router.navigate(['/admin']);
            // console.log('eingeloggt'); // Log zum prüfen
          } else {
          }
        },
        error => {
          console.error('Login fehlgeschlagen:', error);
        }
      );
  }
}
