import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NewsletterService} from '../newsletter.service';
import {PopupNewsletterComponent} from "../popup-newsletter/popup-newsletter.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css'],
  providers: [NewsletterService]
})

export class ImpressumComponent implements OnInit {
  // Variablen
  email: string = '';
  @Input() text: string;

  // Konstruktor
  constructor(private http: HttpClient, private newsletterService: NewsletterService, private modalService: NgbModal) {
    this.text = "Dankeschön! Sie haben unseren Newsletter erfolgreich abonniert."
  }

  ngOnInit() {
  }

  addtoEmail(email: string) { // Funktion zum Hinzufügen einer Email in die newsletter Tabelle
    const url = '/api/addEmail';
    const body = { email };

    this.http.post(url, body).subscribe(
      (response) => {
        //console.log('Email erfolgreich hinzugefügt'); // Log zum Prüfen
      },
      (error) => {
        console.error('Email konnte nicht hinzugefügt werden:', error);
      }
    );
  }

  openPopupNewsletter(text: string) { // Funktion zum Erscheinen eines Popups
    const modalRef = this.modalService.open(PopupNewsletterComponent);
    modalRef.componentInstance.text = text;
  }
}





