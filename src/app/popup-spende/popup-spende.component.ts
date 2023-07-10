import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-spende',
  templateUrl: './popup-spende.component.html',
  styleUrls: ['./popup-spende.component.css']
})
export class PopupSpendeComponent {
  constructor(public modal: NgbActiveModal) {}
}
