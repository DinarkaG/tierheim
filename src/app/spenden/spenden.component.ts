import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SpendenService} from '../spenden.service';
import {PopupSpendeComponent} from "../popup-spende/popup-spende.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spenden',
  templateUrl: './spenden.component.html',
  styleUrls: ['./spenden.component.css'],
  providers: [SpendenService]
})
export class SpendenComponent implements OnInit{
  spendenSum: number = 0;
  constructor(private http: HttpClient, private spendenService: SpendenService, private modalService: NgbModal) {}

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
    const url = '/api/addSpenden';
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

  changeSpenden(spendenwert: number) {
    const url = '/api/changeSpenden';
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

  openPopupSpende() {
    const modalRef = this.modalService.open(PopupSpendeComponent);
  }
}
