import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpendenService {

  private apiUrl = '/api/spendenSum'; // Replace with your actual server-side endpoint URL

  constructor(private http: HttpClient) {}

  getSpendenSum() {
    return this.http.get<{ sum: number }>(this.apiUrl);
  }

}
