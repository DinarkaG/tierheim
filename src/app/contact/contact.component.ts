import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KontaktService } from '../kontakt.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [KontaktService]
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  nachricht: string = '';

  constructor(private http: HttpClient, private kontaktService: KontaktService) {}

  sendMessage() {
    const message = {
      name: this.name,
      email: this.email,
      nachricht: this.nachricht
    };

    this.kontaktService.sendMessage(message)
      .subscribe(
        response => {
          console.log('Message sent');
        },
        error => {
          console.error('Error while sending a message', error);
        }
      );
  }
}
