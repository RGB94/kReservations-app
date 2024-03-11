import { Injectable } from '@angular/core';
import { Reservation, ReservationNotConfirmed } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationKafe {
  reservationNotConfirmed: ReservationNotConfirmed | undefined;
  reservationConfirmed: Reservation | undefined;

  constructor() {}
}
