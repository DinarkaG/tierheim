import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = '/api/tierg';
  constructor(private http: HttpClient) {}

  login(benutzername: string, passwort: string) {
    const url = '/api/login';
    const body = { benutzername, passwort };
    return this.http.post(url, body);
  }

  getTierData() {
    const url = `/api/tierg`;
    return this.http.get(url);
  }

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
              // Map other properties from database columns as needed
            };
          });
        })
      );
  }
  updateTierData(tierData: any) {
    const url = `/api/tier/${tierData.tier_id}`;
    return this.http.put(url, tierData);
  }

  addTier(newTier: any) {
    const url = '/api/tierp';
    return this.http.post(url, newTier);
  }
}
