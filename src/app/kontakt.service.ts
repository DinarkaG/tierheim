import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KontaktService {

  // Benötigte APIs
  private apiUrl = '/api/contact';
  private apiGetUrl = '/api/kontaktg';

  // Konstruktor
  constructor(private http: HttpClient) { }

  // Funktion zum Hinzufügen einer Nachricht in die Kontakttabelle
  sendMessage(message: any) {
    return this.http.post(this.apiUrl, message);
  }

  // Funktion zum Erhalten der Kontakt Daten
  getKontakt(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetUrl)
      .pipe(
        map((data: any[]) => {
          return data.map(kontakt => {
            return {
              name: kontakt.name,
              email: kontakt.email,
              nachricht: kontakt.nachricht
            };
          });
        })
      );
  }

}
