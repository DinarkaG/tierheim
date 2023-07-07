import { Component, OnInit} from '@angular/core';
import { KleintierService} from "../kleintier.service";


@Component({
  selector: 'app-kleintier',
  templateUrl: './kleintier.component.html',
  styleUrls: ['./kleintier.component.css']
})
export class KleintierComponent {
  kleintierData: any[] = [];
  constructor(private tierService: KleintierService) {

  }
  ngOnInit() {
    this.tierService.getKleintiers().subscribe(
      (data) => {
        this.kleintierData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }
}
