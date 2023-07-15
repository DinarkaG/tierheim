import {Component, OnInit} from '@angular/core';
import { TierService } from "../tier.service";

@Component({
  selector: 'app-katze',
  templateUrl: './katze.component.html',
  styleUrls: ['./katze.component.css']
})

export class KatzeComponent implements OnInit{
  // Variable
  tierData: any[] = [];

  // Konstruktor
  constructor(private tierService: TierService) {}

  // Aufrufen der Funktion nach dem Initialisieren der Komponente
  ngOnInit() {
    this.tierService.getTiers().subscribe( // Katzen Array wird mit Katzen Daten gefüllt
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Katzen konnten nicht erhalten werden:', error);
      }
    );
  }
}
