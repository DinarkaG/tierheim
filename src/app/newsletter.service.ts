import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private apiUrl = '/api/addemail';

  constructor(private http: HttpClient) { }

  addtoEmail(email: string){
    return this.http.post(this.apiUrl, email);
  }
}

