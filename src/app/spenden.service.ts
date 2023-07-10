import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io-client';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SpendenService {
  private apiUrl = '/api/spendenSum';
  private socket: Socket = {} as Socket;

  constructor(private http: HttpClient) {}

  getSpendenSum(): Observable<{ sum: number }> {
    return this.http.get<{ sum: number }>(this.apiUrl);
  }

  connect(): void {
    this.socket = io.connect('http://localhost:3000');
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  onUpdate(): Observable<{ spendenSum: number }> {
    return new Observable<{ spendenSum: number }>(observer => {
      this.socket.on('update', (data: any) => {
        observer.next({ spendenSum: data.sum });
      });
    });
  }
}


