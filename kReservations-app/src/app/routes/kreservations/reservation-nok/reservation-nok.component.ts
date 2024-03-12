import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveTableReservation } from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation-nok',
  templateUrl: './reservation-nok.component.html',
  styleUrls: ['./reservation-nok.component.scss']
})
export class ReservationNokComponent implements OnInit {
  day: string = '';
  activeTableReservation: ActiveTableReservation | undefined;

  constructor(private reservationKafeService: ReservationKafe, private router: Router) {}

  ngOnInit(): void {
    this.activeTableReservation = this.reservationKafeService.activeTableReservation;
    this.day = String(this.activeTableReservation?.selectedDate?.getDate());
  }

  /**
   * Returns to reservation component to adjust the active reservation
   */
  editReservation(): void {
    this.reservationKafeService.reservationConfirmed = undefined;
    this.router.navigate(['/reservation']);
  }
}
