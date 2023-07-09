import { Component, OnInit} from '@angular/core';
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
  email: string = ''; // Variable zum Speichern der E-Mail-Adresse

  constructor(private http: HttpClient, private newsletterService: NewsletterService, private modalService: NgbModal) {}

  ngOnInit() {
  }
  addtoEmail(email: string) {
    const url = '/api/addEmail';
    const body = { email };

    this.http.post(url, body).subscribe(
      (response) => {
        console.log('Data added successfully');
      },
      (error) => {
        console.error('Error adding data:', error);
      }
    );
  }

  openPopupNewsletter() {
    const modalRef = this.modalService.open(PopupNewsletterComponent);

  }
}





