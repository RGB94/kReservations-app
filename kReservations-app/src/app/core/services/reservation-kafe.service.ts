import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationKafe {
  reservation: Reservation | undefined;

  constructor() {}

}
