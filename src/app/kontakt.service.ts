import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KontaktService {
  private apiUrl = '/api/contact';
  private apiGetUrl = '/api/kontaktg'
  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    return this.http.post(this.apiUrl, message);
  }

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
