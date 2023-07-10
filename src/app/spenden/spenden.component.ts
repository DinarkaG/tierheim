import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpendenService } from '../spenden.service';
import { PopupSpendeComponent } from "../popup-spende/popup-spende.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spenden',
  templateUrl: './spenden.component.html',
  styleUrls: ['./spenden.component.css'],
  providers: [SpendenService]
})
export class SpendenComponent implements OnInit, OnDestroy {
  spendenSum: number = 0;

  constructor(private http: HttpClient, private spendenService: SpendenService, private modalService: NgbModal) {}

  ngOnInit() {
    this.spendenService.connect();
    this.spendenService.getSpendenSum().subscribe(data => {
      this.spendenSum = data.sum;
    });

    this.spendenService.onUpdate().subscribe(data => {
      this.spendenSum = data.spendenSum;
    });
  }

  ngOnDestroy() {
    this.spendenService.disconnect();
  }

  addToSpenden(wert: number) {
    const url = '/api/addSpenden';
    const body = { wert };

    this.http.post(url, body).subscribe(
      (response) => {
        console.log('Data added successfully');
        this.spendenService.getSpendenSum().subscribe(data => {
          this.spendenSum = data.sum;
        });
      },
      (error) => {
        console.error('Error adding data:', error);
      }
    );
  }

  openPopupSpende() {
    const modalRef = this.modalService.open(PopupSpendeComponent);
  }
}

