import { Reservation } from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from './../../../core/services/reservation-kafe.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss'],
})
export class ReservationSummaryComponent implements OnInit {
  reservationData: Reservation | undefined;
  formattedDate: string | undefined = '';

  constructor(
    private reservationKafeService: ReservationKafe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationData = this.reservationKafeService.reservation;
    this.formattedDate = this.formatDate(this.reservationData?.selectedDate);
  }

  formatDate(date: Date | undefined) {
    const dayOfWeek = date?.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date?.getDate().toString().padStart(2, '0');
    const year = date?.getFullYear();

    return `${dayOfWeek}, ${day} ${year}`;
  }

  editFormData(): void {
    this.router.navigate(['/reservation']);
  }
  confirmReservation(): void {}
}
