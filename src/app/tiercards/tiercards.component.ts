import {Component, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PopupComponent} from "../popup/popup.component";


@Component({
  selector: 'app-tiercards',
  templateUrl: './tiercards.component.html',
  styleUrls: ['./tiercards.component.css']
})
export class TiercardsComponent{


  @Input() name: string;
  @Input() beschreibung: string;
  @Input() bild: string;

  @Input() textinhalt: string;
  @Input() groesse: string;
  @Input() tiername: string;
  @Input() tierrasse: string;
  @Input() tiergeschlecht: string;
  @Input() tieralter: string;
  @Input() tierkrankheit: string;
  @Input() tierbeschreibung: string;


  constructor(private modalService: NgbModal) {
    this.name = 'Tier name';
    this.beschreibung = 'Tier Info';
    this.bild = 'path/to/default-image.jpg';
    this.textinhalt = 'textinhalt';
    this.groesse = 'groesse';
    this.tiername = 'name';
    this.tieralter = 'tier alter';
    this.tierkrankheit = 'krankheit';
    this.tiergeschlecht = 'geschlecht';
    this.tierrasse = 'rasse';
    this.tierbeschreibung = 'beschreibung';
  }


  openPopup(name: string, rasse: string, alter: string, geschlecht: string, krankheit: string, beschreibung: string) {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.rasse = rasse;
    modalRef.componentInstance.alter = alter;
    modalRef.componentInstance.geschlecht = geschlecht;
    modalRef.componentInstance.krankheit = krankheit;
    modalRef.componentInstance.beschreibung = beschreibung;

  }

}
