import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reservationNotConfirmed } from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation-nok',
  templateUrl: './reservation-nok.component.html',
  styleUrls: ['./reservation-nok.component.scss'],
})
export class ReservationNokComponent implements OnInit {
  partySizeAllowed: number = 0;
  day: string = '';
  reservationNotConfirmed: reservationNotConfirmed | undefined;

  constructor(
    private reservationKafeService: ReservationKafe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationNotConfirmed =
      this.reservationKafeService.reservationNotConfirmed;
    this.day = String(this.reservationNotConfirmed?.selectedDate?.getDate());
  }

  editReservation(): void {
    this.reservationKafeService.reservationConfirmed = undefined;
    this.router.navigate(['/reservation']);
  }
}
