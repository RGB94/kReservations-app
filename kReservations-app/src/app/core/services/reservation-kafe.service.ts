import { Injectable } from '@angular/core';
import { ReservationForm } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationKafe {
  reservation: ReservationForm | undefined;

  constructor() {}
}
