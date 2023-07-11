import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-newsletter',
  templateUrl: './popup-newsletter.component.html',
  styleUrls: ['./popup-newsletter.component.css']
})
export class PopupNewsletterComponent {
  @Input() text: string;
  constructor(public modal: NgbActiveModal) {
    this.text = "textinhalt"
  }
}
