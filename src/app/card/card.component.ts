import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() tierart: string;
  @Input() beschreibung: string;
  @Input() bild: string;

  constructor() {
    this.tierart = 'Card Title';
    this.beschreibung = 'Tier Info';
    this.bild = 'path/to/default-image.jpg'; }
}

