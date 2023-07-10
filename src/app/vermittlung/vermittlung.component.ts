import { Component } from '@angular/core';
import {TierService} from "../tier.service";

@Component({
  selector: 'app-vermittlung',
  templateUrl: './vermittlung.component.html',
  styleUrls: ['./vermittlung.component.css']
})
export class VermittlungComponent {


  tierData: any[] = [];
  constructor(private tierService: TierService) {}

  ngOnInit() {
    this.tierService.getTiere().subscribe(
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }
}
