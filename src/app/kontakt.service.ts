import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KontaktService {
  private apiUrl = '/api/contact';
  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    return this.http.post(this.apiUrl, message);
  }

}
