import { Injectable } from '@angular/core';
import { TableReservation, ActiveTableReservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationKafe {
  activeTableReservation: ActiveTableReservation | undefined;
  reservationConfirmed: TableReservation | undefined;

  constructor() {}
}
