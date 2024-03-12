import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region, TableReservation, TimeSlot } from '../interfaces/reservation.interface';
import { API_PATH } from 'src/app/common/constants';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getReservations(): Observable<TableReservation[]> {
    return this.http.get<TableReservation[]>(baseUrl + API_PATH.RESERVATIONS_PATH);
  }

  getReservationTimeSlots(): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(baseUrl + API_PATH.TIME_SLOTS_PATH);
  }

  getRestaurantRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(baseUrl + API_PATH.REGIONS_PATH);
  }

  createReservation(reservation: TableReservation): Observable<TableReservation> {
    return this.http.post<TableReservation>(baseUrl + API_PATH.RESERVATIONS_PATH, reservation);
  }
}
