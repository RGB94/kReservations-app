import { TableReservation, ActiveTableReservation } from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from './../../../core/services/reservation-kafe.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { map } from 'rxjs/operators';
import { RESERVATION_CONSTANTS } from 'src/app/common/constants';

@Component({
  selector: 'reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {
  reservationData: ActiveTableReservation | undefined;
  formattedDate: string = '';

  constructor(
    private reservationKafeService: ReservationKafe,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationData = this.reservationKafeService?.activeTableReservation;
    this.formattedDate = this.formatDate(this.reservationData?.selectedDate);
  }

  /**
   * Format date
   * @param date reservation date
   * @returns formatted date
   */
  formatDate(date: Date | undefined) {
    const dayOfWeek = date?.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date?.getDate().toString().padStart(2, '0');
    const year = date?.getFullYear();

    return `${dayOfWeek}, ${day} ${year}`;
  }

  /**
   * Back to reservations to edit the reservation
   */
  editReservation(): void {
    this.router.navigate(['/reservation']);
  }

  /**
   * Checks whether the user can make the table reservation or not
   * @param tablesReserved tables reserved for the region
   * @param regionName region name
   * @returns true or false
   */
  canCreateReservation(tablesReserved: number, regionName: string | undefined): boolean {
    switch (regionName) {
      case RESERVATION_CONSTANTS.BAR_REGION_NAME:
        return tablesReserved < RESERVATION_CONSTANTS.AVAILABLE_TABLES_BAR;
      case RESERVATION_CONSTANTS.MAIN_HALL_REGION_NAME:
        return tablesReserved < RESERVATION_CONSTANTS.AVAILABLE_TABLES_MAIN_HALL;
      case RESERVATION_CONSTANTS.RIVERSIDE_REGION_NAME:
        return tablesReserved < RESERVATION_CONSTANTS.AVAILABLE_TABLES_RIVERSIDE;
      case RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_REGION_NAME:
        return tablesReserved < RESERVATION_CONSTANTS.AVAILABLE_TABLES_RIVERSIDE_SMOKING;
      default:
        return false;
    }
  }

  /**
   * Starts the process of confirming the reservation
   */
  confirmReservation(): void {
    this.apiService
      .getReservations()
      .pipe(
        map((reservations: TableReservation[]) =>
          reservations.filter(
            (reservation: TableReservation) =>
              reservation.day === String(this.reservationData?.selectedDate?.getDate()) &&
              reservation.region?.name === this.reservationData?.selectedRegion?.name
          )
        )
      )
      .subscribe({
        next: (filteredReservations: TableReservation[]) => {
          if (
            !filteredReservations.length ||
            this.canCreateReservation(filteredReservations.length, this.reservationData?.selectedRegion?.name)
          ) {
            this.createReservation();
          } else {
            this.router.navigate(['/reservation-cancelled']);
          }
        },
        error: (error: any) => {}
      });
  }

  /**
   * Creates the new reservation
   */
  createReservation(): void {
    let reservation: TableReservation = {
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
      id: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 // creates random ID to create reservation
    };
    this.apiService.createReservation(reservation).subscribe({
      next: (resp: any) => {
        // redirect OK page
        this.reservationKafeService.reservationConfirmed = reservation;
        this.router.navigate(['/reservation-confirmed']);
      },
      error: (error: any) => {}
    });
  }
}
