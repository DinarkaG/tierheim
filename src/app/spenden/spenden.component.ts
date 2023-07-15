import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpendenService } from '../spenden.service';
import {PopupNewsletterComponent} from "../popup-newsletter/popup-newsletter.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spenden',
  templateUrl: './spenden.component.html',
  styleUrls: ['./spenden.component.css'],
  providers: [SpendenService]
})
export class SpendenComponent implements OnInit, OnDestroy {

  // Variable zum Speichern der Spendensumme
  spendenSum: number = 0;

  // Variable zum Überschreiben den Text Inhalts des Popups
  @Input() text: string;

  // Konstruktor
  constructor(private http: HttpClient, private spendenService: SpendenService, private modalService: NgbModal) {
    this.text = "Dankeschön für ihre Spende!"
  }

  // Ausführen der Funktionen nach Initialisierung der Komponente
  ngOnInit() {
    this.spendenService.connect();
    this.spendenService.getSpendenSum().subscribe(data => {
      this.spendenSum = data.sum;
    });

    this.spendenService.onUpdate().subscribe(data => {
      this.spendenSum = data.spendenSum;
    });
  }

  ngOnDestroy() { // Funktion zum Trenne der Verbindung, wenn das fenster geschlossen wird
    this.spendenService.disconnect();
  }

  addToSpenden(wert: number) { // Funktion zum Aufsummieren der Spenden Daten
    const url = '/api/addSpenden';
    const body = { wert };

    this.http.post(url, body).subscribe(
      (response) => {
        // console.log('Erfolgreich Aufsummiert'); // Log zum Prüfen
        this.spendenService.getSpendenSum().subscribe(data => {
          this.spendenSum = data.sum;
        });
      },
      (error) => {
        console.error('Spendensumme konnte nicht erhalten werden:', error);
      }
    );
  }

  openPopupSpende(text: string) { // Funktion zum Aufrufen eines Popups
    const modalRef = this.modalService.open(PopupNewsletterComponent);
    modalRef.componentInstance.text = text;
  }
}

