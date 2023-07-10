import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpendenService {

  private apiUrl = '/api/spendenSum';

  constructor(private http: HttpClient) {}

  getSpendenSum() {
    return this.http.get<{ sum: number }>(this.apiUrl);
  }

}
