import {
  Reservation,
  reservationNotConfirmed,
} from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from './../../../core/services/reservation-kafe.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss'],
})
export class ReservationSummaryComponent implements OnInit {
  reservationData: reservationNotConfirmed | undefined;
  formattedDate: string | undefined = '';

  constructor(
    private reservationKafeService: ReservationKafe,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationData = this.reservationKafeService.reservationNotConfirmed;
    this.formattedDate = this.formatDate(this.reservationData?.selectedDate);
  }

  formatDate(date: Date | undefined) {
    const dayOfWeek = date?.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date?.getDate().toString().padStart(2, '0');
    const year = date?.getFullYear();

    return `${dayOfWeek}, ${day} ${year}`;
  }

  editReservation(): void {
    this.router.navigate(['/reservation']);
  }

  confirmReservation(): void {
    this.apiService
      .getReservations()
      .pipe(
        map((reservations: Reservation[]) =>
          reservations.filter(
            (reservation: Reservation) =>
              reservation.day ===
                String(this.reservationData?.selectedDate?.getDate()) &&
              reservation.time === this.reservationData?.selectedTime?.code
          )
        )
      )
      .subscribe({
        next: (filteredReservations: Reservation[]) => {
          if (!filteredReservations.length) {
            this.createReservation();
          } else {
            // Redirect to nok reservation, say that the reservation time is already
            // taken and propose edit the reservation via button and redirect to /reservation
            this.router.navigate(['/reservation-cancelled']);
          }
        },
        error: (error: any) => {
          // console.error(error);
        },
      });
  }

  createReservation(): void {
    let reservation: Reservation = {
      day: String(this.reservationData?.selectedDate?.getDate()),
      time: this.reservationData?.selectedTime?.code,
      name: this.reservationData?.name,
      email: this.reservationData?.email,
      phone: this.reservationData?.phone,
      partySize: this.reservationData?.partySize,
      region: this.reservationData?.selectedRegion,
      children: this.reservationData?.children,
      smoking: this.reservationData?.smoking,
      birthday: this.reservationData?.birthday,
      birthdayName: this.reservationData?.birthdayName,
      id: Math.random(), // creates random ID
    };
    this.apiService.createReservation(reservation).subscribe({
      next: (resp: any) => {
        // redirect OK page
        this.reservationKafeService.reservationConfirmed = reservation;
        this.router.navigate(['/reservation-confirmed']);
      },
      error: (error: any) => {
        // console.error(error);
      },
    });
  }
}
