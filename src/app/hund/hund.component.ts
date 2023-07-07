import { Component } from '@angular/core';
import {HundService} from "../hund.service";

@Component({
  selector: 'app-hund',
  templateUrl: './hund.component.html',
  styleUrls: ['./hund.component.css']
})
export class HundComponent {
  hundData: any[] = [];
  constructor(private tierService: HundService) {

  }
  ngOnInit() {
    this.tierService.getHunds().subscribe(
      (data) => {
        this.hundData = data;
      },
      (error) => {
        console.error('Error retrieving tier data:', error);
      }
    );
  }
}
