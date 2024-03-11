import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RESERVATION_CONSTANTS } from 'src/app/common/constants';
import { Region, ReservationNotConfirmed, TimeSlot } from 'src/app/core/interfaces/reservation.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  @ViewChild('reservationForm') reservationForm!: NgForm; // Use type assertion for type safety

  // Available time slots
  timeSlots!: TimeSlot[];
  // Available regions and their details
  regions!: Region[];

  // User input variables
  reservation!: ReservationNotConfirmed;
  emailRegex!: RegExp;
  isDataLoaded: boolean = false;
  isChildrenPartyEnabled: boolean = false;

  constructor(
    private reservationService: ReservationKafe,
    private router: Router,
    private apiService: ApiService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  ngOnInit(): void {
    this.initFormData(this.reservationService?.reservationNotConfirmed);
  }

  initReservation(): void {
    this.reservation = {
      selectedDate: new Date(2024, 6, 24),
      selectedTime: this.timeSlots[0],
      name: '',
      email: '',
      phone: '',
      partySize: RESERVATION_CONSTANTS.MIN_PARTY_SIZE,
      selectedRegion: this.regions[0],
      tableCapacity: RESERVATION_CONSTANTS.MAIN_HALL_TABLE_PARTY_SIZE, //Main hall init
      children: 0,
      smoking: false,
      birthday: false,
      birthdayName: '',
      isValidEmail: false,
      isValidPhone: false,
      partySizeInfo: '',
      minDate: new Date(2024, 6, 24), // July 24th, 2024
      maxDate: new Date(2024, 6, 31) // July 31st, 2024;
    };
  }

  recoverPreviousReservation(reservationSummary: ReservationNotConfirmed): void {
    this.reservation.selectedDate = reservationSummary?.selectedDate;
    this.reservation.selectedTime = reservationSummary?.selectedTime;
    this.reservation.name = reservationSummary?.name;
    this.reservation.email = reservationSummary?.email;
    this.reservation.phone = reservationSummary?.phone;
    this.reservation.partySize = reservationSummary?.partySize;
    this.reservation.selectedRegion = reservationSummary?.selectedRegion;
    this.reservation.children = reservationSummary?.children;
    this.reservation.tableCapacity = reservationSummary?.tableCapacity;
    this.reservation.smoking = reservationSummary?.smoking;
    this.reservation.birthday = reservationSummary?.birthday;
    this.reservation.isValidEmail = reservationSummary?.isValidEmail;
    this.reservation.isValidPhone = reservationSummary?.isValidPhone;
    this.reservation.birthdayName = reservationSummary?.birthdayName;
    this.reservation.partySizeInfo = reservationSummary?.partySizeInfo;
    this.reservation.minDate = reservationSummary?.minDate;
    this.reservation.maxDate = reservationSummary?.maxDate;
  }

  initFormData(reservationSummary: ReservationNotConfirmed | undefined): void {
    forkJoin([this.apiService.getReservationTimeSlots(), this.apiService.getRestaurantRegions()]).subscribe({
      next: (response: any) => {
        this.timeSlots = response[0];
        this.regions = response[1];
        // Init reservation
        this.initReservation();

        if (reservationSummary !== undefined) {
          // Recover the previous reservation to edit
          this.recoverPreviousReservation(reservationSummary);
        }
      },
      complete: () => {
        this.isDataLoaded = true;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  /**
   * Checks if input email is valid
   * @param newEmail user email
   */
  handleInputEmail(newEmail: string) {
    this.emailRegex?.test(newEmail) === true
      ? (this.reservation.isValidEmail = true)
      : (this.reservation.isValidEmail = false);
  }

  /**
   * Reset time slot selected when date changes
   * @param event
   */
  onDateSelect(event: any) {
    this.reservation.selectedTime = this.timeSlots[0];
  }

  /**
   * Checks if the children party is allowed based on the selected region name
   * @returns true or false
   */
  isChildrenPartyAllowed(): boolean {
    return this.reservation.selectedRegion.name == RESERVATION_CONSTANTS.BAR_REGION_NAME ||
      this.reservation.selectedRegion.name == RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_REGION_NAME
      ? false
      : true;
  }

  // recalculateChildrenPartySize(partySize: number, isChildren: boolean): void {
  //   if (isChildren) {
  //     if (partySize > 0 && (partySize === this.reservation.partySize || partySize >= this.reservation.partySize)) {
  //       this.reservation.children = this.reservation.partySize - 1;
  //     }
  //   } else {
  //     if (this.reservation.children > 0 && this.reservation.children >= partySize) {
  //       this.reservation.children = partySize - 1;
  //     }
  //   }
  //   this.changeDetector.detectChanges();
  // }

  resetRegionRelatedFormData(): void {
    this.reservation.partySize = 1;
    this.reservation.children = 0;
    this.reservation.birthday = false;
    this.reservation.birthdayName = '';
    this.reservation.smoking = false;
  }

  /**
   * Updates the party size limit based on the user selected region
   */
  updatePartySizeLimit(): void {
    switch (this.reservation.selectedRegion.name) {
      case RESERVATION_CONSTANTS.BAR_REGION_NAME:
        this.reservation.partySizeInfo = RESERVATION_CONSTANTS.BAR_TABLE_PARTY_SIZE_INFO;
        this.reservation.tableCapacity = RESERVATION_CONSTANTS.BAR_TABLE_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
      case RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_REGION_NAME:
        this.reservation.partySizeInfo = RESERVATION_CONSTANTS.RIVERSIDE_TABLE_SMOKING_PARTY_SIZE_INFO;
        this.reservation.tableCapacity = RESERVATION_CONSTANTS.RIVERSIDE_TABLE_SMOKING_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
      case RESERVATION_CONSTANTS.MAIN_HALL_REGION_NAME:
        this.reservation.partySizeInfo = RESERVATION_CONSTANTS.MAIN_HALL_TABLE_PARTY_SIZE_INFO;
        this.reservation.tableCapacity = RESERVATION_CONSTANTS.MAIN_HALL_TABLE_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
      case RESERVATION_CONSTANTS.RIVERSIDE_REGION_NAME:
        this.reservation.partySizeInfo = RESERVATION_CONSTANTS.RIVERSIDE_TABLE_PARTY_SIZE_INFO;
        this.reservation.tableCapacity = RESERVATION_CONSTANTS.RIVERSIDE_TABLE_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
    }
  }

  /**
   * Jumps to the reservation summary component
   */
  showReservationSummary() {
    this.reservationService.reservationNotConfirmed = {
      selectedDate: this.reservation?.selectedDate,
      selectedTime: {
        name: this.reservation.selectedTime?.name,
        code: this.reservation.selectedTime?.code
      },
      name: this.reservation?.name,
      email: this.reservation?.email,
      phone: this.reservation?.phone,
      partySize: this.reservation?.partySize,
      selectedRegion: this.reservation?.selectedRegion,
      tableCapacity: this.reservation?.tableCapacity,
      children: this.reservation?.children,
      smoking: this.reservation?.smoking,
      birthday: this.reservation?.birthday,
      birthdayName: this.reservation?.birthdayName,
      isValidEmail: this.reservation?.isValidEmail,
      isValidPhone: this.reservation?.isValidPhone,
      partySizeInfo: this.reservation?.partySizeInfo,
      minDate: this.reservation?.minDate,
      maxDate: this.reservation?.maxDate
    };
    this.router.navigate(['/reservation-summary']);
  }
}
