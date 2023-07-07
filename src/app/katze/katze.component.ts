import {Component, OnInit} from '@angular/core';
import { TierService } from "../tier.service";


@Component({
  selector: 'app-katze',
  templateUrl: './katze.component.html',
  styleUrls: ['./katze.component.css']
})
export class KatzeComponent implements OnInit{
  tierData: any[] = [];
  constructor(private tierService: TierService) {

  }
  ngOnInit() {
    this.tierService.getTiers().subscribe(
      (data) => {
        this.tierData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }

}
