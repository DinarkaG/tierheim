import {Component, Input} from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() tierart: string;
  @Input() beschreibung: string;
  @Input() bild: string;
  @Input() groesse: string;
  @Input() weblink: string;
  @Input() filter: string;
  @Input() routerLink: string;

  constructor(private route: ActivatedRoute) {
    this.tierart = 'Card Title';
    this.beschreibung = 'Tier Info';
    this.bild = 'path/to/default-image.jpg';
    this.groesse = 'bildgroesse';
    this.weblink = 'seitenlink';
    this.filter = 'filter';
    this.routerLink = 'filterLink';

  }
}
