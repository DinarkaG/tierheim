import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() tierart: string;
  @Input() beschreibung: string;

  constructor() {
    this.tierart = 'Card Title';
    this.beschreibung = 'path/to/default-image.jpg';  }
}

