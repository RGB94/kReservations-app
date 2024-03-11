import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region, Reservation, TimeSlot } from '../interfaces/reservation.interface';
import { API_PATH } from 'src/app/common/constants';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(baseUrl + API_PATH.RESERVATIONS_PATH);
  }

  getReservationTimeSlots(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(baseUrl + API_PATH.TIME_SLOTS_PATH);
  }

  getRestaurantRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(baseUrl + API_PATH.REGIONS_PATH);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(baseUrl + API_PATH.RESERVATIONS_PATH, reservation);
  }
}
