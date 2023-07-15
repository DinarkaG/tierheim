import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login.service";
import {SpendenService} from "../spenden.service";
import {KontaktService} from "../kontakt.service";
import {NewsletterService} from "../newsletter.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  // Variablen zum speichern der Tierdaten
  tabellebild: string;
  tabellekurzbeschreibung: string;
  tabelletiername: string;
  tabelletierrasse: string;
  tabelletiergeschlecht: string;
  tabelletieralter: string;
  tabelletierart: string;
  tabelletierkrankheit: string;
  tabelletierbeschreibung: string;

  // Variablen zum speichern der Daten
  tierData: any[] = [];
  kontaktData: any[] = [];
  newsletterData: any[] = [];
  spendenSum: number = 0;

  // Konstruktor
  constructor(private loginService: LoginService, private http: HttpClient, private spendenService: SpendenService, private kontaktService: KontaktService, private newsletterService: NewsletterService) {
    this.tabellebild = 'path/to/default-image.jpg';
    this.tabellekurzbeschreibung = 'textinhalt';
    this.tabelletiername = 'name';
    this.tabelletieralter = 'tier alter';
    this.tabelletierart = 'tier art';
    this.tabelletierkrankheit = 'krankheit';
    this.tabelletiergeschlecht = 'geschlecht';
    this.tabelletierrasse = 'rasse';
    this.tabelletierbeschreibung = 'beschreibung';
  }

  // Ausführen der Funktionen nach der Initialisierung der Komponente
  ngOnInit() {
    this.getSpendenSum();
    this.getTierData();
    this.getKontaktData();
    this.getNewsletterData();
  }


  deleteTier(tier: any) { // Funktion zum Löschen eines Tieres
    const tierId = tier.tier_id;
    this.loginService.deleteTier(tierId).subscribe(
      (response: any) => {
        //console.log('Tier deleted successfully'); // Log zum prüfen
        this.getTierData();
      },
      error => {
        console.error('Tier konnte nicht gelöscht werden:', error);
      }
    );
  }

  getTierData() { // Funktion zum Erhalten der Tier Daten
    this.loginService.getTiers().subscribe(
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Tier Daten konnten nicht erhalten werden:', error);
      }
    );
  }

  getKontaktData() { // Funktion zum Erhalten der Kontakt Daten
    this.kontaktService.getKontakt().subscribe(
      (data) => {
        this.kontaktData = data;
      },
      (error) => {
        console.error('Kontakt Daten konnten nicht erhalten werden:', error);
      }
    );
  }

  getNewsletterData() { // Funktion zum Erhalten der Newsletter Daten
    this.newsletterService.getNewsletter().subscribe(
      (data) => {
        this.newsletterData = data;
      },
      (error) => {
        console.error('Newsletter Daten konnten nicht erhalten werden:', error);
      }
    );
  }

  submitChanges(tier: any) { // Funktion zum Ändern eines Tieres
    this.loginService.updateTierData(tier).subscribe(
      (response: any) => {
        // console.log('Erfolgreich geändert'); // Log zum prüfen
        this.getTierData();
      },
      error => {
        console.error('Veränderungen konnten nicht eingereicht werden:', error);
      }
    );
  }

  addTier() { // Funktion zum Hinzufügen eines Tieres
    const newTier: any = {
      tierbild: this.tabellebild,
      tiername: this.tabelletiername,
      tiergeschlecht: this.tabelletiergeschlecht,
      tierart: this.tabelletierart,
      tieralter: this.tabelletieralter,
      tierrasse: this.tabelletierrasse,
      tierkrankheit: this.tabelletierkrankheit,
      tierbeschreibung: this.tabelletierbeschreibung,
      kurzbeschreibung: this.tabellekurzbeschreibung
    };

    this.loginService.addTier(newTier).subscribe(
      (response: any) => {
        this.getTierData();
        this.tabellebild = '';
        this.tabellekurzbeschreibung = '';
        this.tabelletiername = '';
        this.tabelletieralter = '';
        this.tabelletierart = '';
        this.tabelletierkrankheit = '';
        this.tabelletiergeschlecht = '';
        this.tabelletierrasse = '';
        this.tabelletierbeschreibung = '';
      },
      error => {
        console.error('Tier konnte nicht hinzugefügt werden:', error);
      }
    );
  }

  getSpendenSum() { // Funktion zum Erhalten der Spenden Daten
    this.spendenService.getSpendenSum().subscribe(
      (response) => {
        this.spendenSum = response.sum;
      },
      (error) => {
        console.error('Summe konnte nicht erhalten werden:', error);
      }
    );
  }

  changeSpenden() { // Funktion zum Verändern der Spenden Daten
    const url = '/api/changeSpenden';
    this.http.delete(url).subscribe(
      (response) => {
        //console.log('Erfolgreich gelöscht'); // Log zum Prüfen
        this.getSpendenSum();
      },
      (error) => {
        console.error('Spenden konnten nicht gelöscht werden:', error);
      }
    );
  }

}
