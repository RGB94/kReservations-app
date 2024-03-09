import { Injectable } from '@angular/core';
import { Reservation, reservationNotConfirmed } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationKafe {
  reservationNotConfirmed: reservationNotConfirmed | undefined;
  reservationConfirmed: Reservation | undefined;

  constructor() {}
}
