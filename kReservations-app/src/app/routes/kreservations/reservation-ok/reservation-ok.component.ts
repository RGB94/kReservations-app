import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation-ok',
  templateUrl: './reservation-ok.component.html',
  styleUrls: ['./reservation-ok.component.scss'],
})
export class ReservationOkComponent implements OnInit {
  reservation: Reservation | undefined;
  constructor(
    private reservationKafeService: ReservationKafe,
    private router: Router
  ) {}

  ngOnInit(): void {
    //TODO: add api call to reservations and calculate the space left in the restaurant para llegar a maximo 12.
    this.reservation = this.reservationKafeService.reservationConfirmed;
  }

  startNewReservation(): void {
    this.reservationKafeService.reservationConfirmed = undefined;
    this.reservationKafeService.reservationNotConfirmed = undefined;
    this.router.navigate(['/reservation']);
  }
}
