import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableReservation } from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation-ok',
  templateUrl: './reservation-ok.component.html',
  styleUrls: ['./reservation-ok.component.scss']
})
export class ReservationOkComponent implements OnInit {
  reservation: TableReservation | undefined;
  
  constructor(private reservationKafeService: ReservationKafe, private router: Router) {}

  ngOnInit(): void {
    this.reservation = this.reservationKafeService.reservationConfirmed;
  }

  /**
   * Jumps to reservation component and resets some data
   */
  startNewReservation(): void {
    this.reservationKafeService.reservationConfirmed = undefined;
    this.reservationKafeService.activeTableReservation = undefined;
    this.router.navigate(['/reservation']);
  }
}
