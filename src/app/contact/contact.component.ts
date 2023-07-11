import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KontaktService } from '../kontakt.service';
import {PopupNewsletterComponent} from "../popup-newsletter/popup-newsletter.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() text: string;
  constructor(private http: HttpClient, private kontaktService: KontaktService, private modalService: NgbModal) {
    this.text = "Vielen Dank für Ihre Nachricht."
  }

  sendMessage() {
    const message = {
      name: this.name,
      email: this.email,
      nachricht: this.nachricht,
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
  openPopupNewsletter(text: string) {
    const modalRef = this.modalService.open(PopupNewsletterComponent);
    modalRef.componentInstance.text = text;
  }
}
