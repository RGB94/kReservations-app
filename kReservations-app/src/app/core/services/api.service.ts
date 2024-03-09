// src/app/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation.interface';

const baseUrl = 'http://localhost:3000/reservations';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Reservation[]>(baseUrl, { headers });
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Reservation>(baseUrl, reservation, { headers });
  }
}
