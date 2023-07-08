import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SpendenService} from '../spenden.service';


@Component({
  selector: 'app-spenden',
  templateUrl: './spenden.component.html',
  styleUrls: ['./spenden.component.css'],
  providers: [SpendenService]
})
export class SpendenComponent implements OnInit{
  spendenSum: number = 0;
  constructor(private http: HttpClient, private spendenService: SpendenService) {}

  ngOnInit() {
    this.getSpendenSum();
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

  addToSpenden(wert: number) {
    const url = '/api/addSpenden'; // Replace with your actual server-side endpoint URL
    const body = { wert };

    this.http.post(url, body).subscribe(
      (response) => {
        console.log('Data added successfully');
        this.getSpendenSum();
      },
      (error) => {
        console.error('Error adding data:', error);
      }
    );
  }
}
