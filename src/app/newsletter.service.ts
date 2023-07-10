import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private apiUrl = '/api/addemail';
  private apiGetUrl = '/api/getemail';

  constructor(private http: HttpClient) { }

  addtoEmail(email: string){
    return this.http.post(this.apiUrl, email);
  }

  getNewsletter(): Observable<any[]> {
    return this.http.get<any[]>(this.apiGetUrl)
      .pipe(
        map((data: any[]) => {
          return data.map(newsletter => {
            return {
              newsletter_id: newsletter.newsletter_id,
              email: newsletter.email,
            };
          });
        })
      );
  }

}

