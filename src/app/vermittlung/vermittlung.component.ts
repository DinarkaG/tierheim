import { Component } from '@angular/core';
import {TierService} from "../tier.service";

@Component({
  selector: 'app-vermittlung',
  templateUrl: './vermittlung.component.html',
  styleUrls: ['./vermittlung.component.css']
})
export class VermittlungComponent {

  // Array zum Speichern dre Tierdaten
  tierData: any[] = [];

  // Konstruktor
  constructor(private tierService: TierService) {}

  // Funktionen werden nach der Initialisierung der Komponente aufgerufen
  ngOnInit() {
    this.tierService.getTiere().subscribe( // Tier array wird mit Tier daten gefüllt
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Tier Daten konnten nicht erhalten werden:', error);
      }
    );
  }
}
