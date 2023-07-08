import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from "../login.service";
import {SpendenService} from "../spenden.service";
import { HttpClient } from '@angular/common/http';


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
  spendenSum: number = 0;


  constructor(private loginService: LoginService, private http: HttpClient, private spendenService: SpendenService) {
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
    this.getSpendenSum();

    this.loginService.getTiers().subscribe(
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }

  deleteTier(tier: any) {
    const tierId = tier.tier_id;
    this.loginService.deleteTier(tierId).subscribe(
      (response: any) => {
        console.log('Tier deleted successfully');
        // Optionally, update the tier data after successful deletion
        this.getTierData();
      },
      error => {
        console.error('Error deleting tier:', error);
        // Handle the error
      }
    );
  }

  getTierData() {

    this.loginService.getTiers().subscribe(
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }

  submitChanges(tier: any) {
    this.loginService.updateTierData(tier).subscribe(
      (response: any) => {
        console.log('Changes submitted successfully');
        // Optionally, update the tier data after successful submission
        this.getTierData();
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
        console.error('Error adding tier:', error);
        // Handle the error
      }
    );
  }
  getSpendenSum() {
    this.spendenService.getSpendenSum().subscribe(
      (response) => {
        this.spendenSum = response.sum;
      },
      (error) => {
        console.error('Error retrieving sum:', error);
      }
    );
  }


  changeSpenden(spendenwert: number) {
    const url = '/api/changeSpenden'; // Replace with your actual server-side endpoint URL
    /*const body = { spendenwert };*/
    this.http.delete(url).subscribe(
      (response) => {
        console.log('Data deleted successfully');
        this.getSpendenSum();
      },
      (error) => {
        console.error('Error deleting data:', error);
      }
    );
  }

}
