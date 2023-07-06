import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @Input() username: string;
  @Input() password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

  onSubmit() {
    // Hier können Sie die Logik für die Überprüfung der Anmeldeinformationen implementieren
    if (this.username === 'admin' && this.password === 'password') {
      // Erfolgreiche Anmeldung - Weiterleitung zu einer geschützten Seite oder Ähnlichem
      console.log('Login erfolgreich');
    } else {
      // Fehlerhafte Anmeldeinformationen - Anzeige einer Fehlermeldung oder Ähnlichem
      console.log('Falscher Benutzername oder falsches Passwort');
    }
  }
}
