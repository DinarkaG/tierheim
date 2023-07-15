import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SpendenService {

  // Benötigte API
  private apiUrl = '/api/spendenSum';
  // Socket
  private socket: Socket = {} as Socket;

  //Konstruktor
  constructor(private http: HttpClient) {}

  // Funktion zum Erhalten der Spendensumme
  getSpendenSum(): Observable<{ sum: number }> {
    return this.http.get<{ sum: number }>(this.apiUrl);
  }

  // Funktion zum Verbinden des Servers
  connect(): void {
    this.socket = io.connect('http://localhost:3000');
  }

  // Funktion zum Trennen des Servers
  disconnect(): void {
    this.socket.disconnect();
  }

  // Funktion zum Aktualisieren der Spendensumme
  onUpdate(): Observable<{ spendenSum: number }> {
    return new Observable<{ spendenSum: number }>(observer => {
      this.socket.on('update', (data: any) => {
        observer.next({ spendenSum: data.sum });
      });
    });
  }
}


