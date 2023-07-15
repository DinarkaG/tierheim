import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Benötigte API
  private apiUrl = '/api/tierg';

  // Konstruktor
  constructor(private http: HttpClient) {}

  // Login Funktion
  login(benutzername: string, passwort: string) {
    const url = '/api/login';
    const body = { benutzername, passwort };
    return this.http.post(url, body);
  }

  // Funktion zum Erhalten der Tierdaten
  getTierData() {
    const url = `/api/tierg`;
    return this.http.get(url);
  }

  // Funktion zum Speichern der einzelnen Tierdaten
  getTiers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map((data: any[]) => {
          return data.map(tier => {
            return {
              tier_id: tier.tier_id,
              kurzbeschreibung: tier.kurzbeschreibung,
              tierbild: tier.tierbild,
              tiername: tier.tiername,
              tierbeschreibung: tier.tierbeschreibung,
              tiergeschlecht: tier.tiergeschlecht,
              tierart: tier.tierart,
              tieralter: tier.tieralter,
              tierrasse: tier.tierrasse,
              tierkrankheit: tier.tierkrankheit
            };
          });
        })
      );
  }

  // Funktion zum Aktualisieren der Tierdaten
  updateTierData(tierData: any) {
    const url = `/api/tier/${tierData.tier_id}`;
    return this.http.put(url, tierData);
  }

  // Funktion zum Hinzufügen eines Tieres
  addTier(newTier: any) {
    const url = '/api/tierp';
    return this.http.post(url, newTier);
  }

  // Funktionen zum Löschen eines Tieres
  deleteTier(tierId: number) {
    const url = `/api/tierd/${tierId}`;
    return this.http.delete(url);
  }

}
