import { Component } from '@angular/core';
import {HundService} from "../hund.service";

@Component({
  selector: 'app-hund',
  templateUrl: './hund.component.html',
  styleUrls: ['./hund.component.css']
})
export class HundComponent {

  // Variable zum Speichern der Hundedaten
  hundData: any[] = [];

  // Konstruktor
  constructor(private tierService: HundService) {}

  // Aufrufen der Funktion nach Initialisierung der Komponente
  ngOnInit() {
    this.tierService.getHunds().subscribe( // Hunde Array wird mit Hundedaten gefüllt
      (data) => {
        this.hundData = data;
      },
      (error) => {
        console.error('Tier Daten konnten nicht erhalten werden:', error);
      }
    );
  }
}
