import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../login.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  tabellebild: string;
  tabellekurzbeschreibung: string;
  tabelletiername: string;
  tabelletierrasse: string;
  tabelletiergeschlecht: string;
  tabelletieralter: string;
  tabelletierart: string;
  tabelletierkrankheit: string;
  tabelletierbeschreibung: string;

  tierData: any[] = [];

  constructor(private loginService: LoginService) {
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

  ngOnInit() {
    this.loginService.getTiers().subscribe(
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }

  getTierData() {
    this.loginService.getTierData().subscribe(
      (response: any) => {
        this.tierData = response.data; // Assuming the API response contains the tier data in a 'data' property
      },
      error => {
        console.error('Error retrieving tier data:', error);
        // Handle the error
      }
    );
  }

  submitChanges(tier: any) {
    this.loginService.updateTierData(tier).subscribe(
      (response: any) => {
        console.log('Changes submitted successfully');
        // Optionally, update the tier data after successful submission
        //this.getTierData();
      },
      error => {
        console.error('Error submitting changes:', error);
        // Handle the error
      }
    );
  }

  addTier() {
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
        console.log('New tier added successfully');
        // Optionally, update the tier data after successful addition
        //this.getTierData();
        this.tabellebild = 'path/to/default-image.jpg';
        this.tabellekurzbeschreibung = 'textinhalt';
        this.tabelletiername = 'name';
        this.tabelletieralter = 'tier alter';
        this.tabelletierart = 'tier art';
        this.tabelletierkrankheit = 'krankheit';
        this.tabelletiergeschlecht = 'geschlecht';
        this.tabelletierrasse = 'rasse';
        this.tabelletierbeschreibung = 'beschreibung';
      },
      error => {
        console.error('Error adding tier:', error);
        // Handle the error
      }
    );
  }
}
