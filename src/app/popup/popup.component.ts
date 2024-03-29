import {Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {

  // Variablen zum Überschreiben des Popup Inhalts
  @Input() name: string;
  @Input() alter: string;
  @Input() krankheit: string;
  @Input() beschreibung: string;
  @Input() rasse: string;
  @Input() geschlecht: string;

  // Konstruktor
  constructor(public modal: NgbActiveModal) {
    this.name = 'name';
    this.alter = 'alter';
    this.krankheit = 'krankheit';
    this.beschreibung = 'beschreibung';
    this.rasse = 'rasse';
    this.geschlecht = 'geschlecht';
  }

}
