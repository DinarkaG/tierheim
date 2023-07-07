import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KleintierService {
  private apiUrl = '/api/kleintier'; // Replace with your actual API endpoint URL

  constructor(private http: HttpClient) {}

  getKleintiers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map((data: any[]) => {
          return data.map(tier => {
            return {
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
}
