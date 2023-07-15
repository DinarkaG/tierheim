import { Component, OnInit} from '@angular/core';
import { KleintierService} from "../kleintier.service";

@Component({
  selector: 'app-kleintier',
  templateUrl: './kleintier.component.html',
  styleUrls: ['./kleintier.component.css']
})

export class KleintierComponent {
  // Variable
  kleintierData: any[] = [];

  // Konstruktor
  constructor(private tierService: KleintierService) {}

  // Aufrufen der Funktion nach dem Initialisieren der Komponente
  ngOnInit() {
    this.tierService.getKleintiers().subscribe( // Kleintier Array wird mit Kleintier Daten gefüllt
      (data) => {
        this.kleintierData = data;
      },
      (error) => {
        console.error('Kleintiere konnten nicht erhalten werden:', error);
      }
    );
  }
}
