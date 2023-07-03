import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tiercards',
  templateUrl: './tiercards.component.html',
  styleUrls: ['./tiercards.component.css']
})
export class TiercardsComponent {

  @Input() tierart: string;
  @Input() beschreibung: string;
  @Input() bild: string;
  @Input() groesse: string;

  constructor() {
    this.tierart = 'Card Title';
    this.beschreibung = 'Tier Info';
    this.bild = 'path/to/default-image.jpg';
    this.groesse = 'bildgroesse';
  }
}
