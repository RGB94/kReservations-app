import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RESERVATION_CONSTANTS } from 'src/app/common/constants';
import {
  Region,
  reservationNotConfirmed,
  TimeSlot,
} from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  @ViewChild('reservationForm') reservationForm!: NgForm; // Use type assertion for type safety

  // Available time slots
  timeSlots!: TimeSlot[];
  // Available regions and their details
  regions!: Region[];

  // User input variables
  reservation!: reservationNotConfirmed;
  emailRegex!: RegExp;
  isDataLoaded: boolean = false;

  constructor(
    private reservationService: ReservationKafe,
    private router: Router
  ) {
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  ngOnInit(): void {
    this.initFormData(this.reservationService.reservationNotConfirmed);
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
      maxPartySize: RESERVATION_CONSTANTS.MAIN_HALL_PARTY_SIZE, //Main hall init
      children: 0,
      smoking: false,
      birthday: false,
      birthdayName: '',
      isValidEmail: false,
      isValidPhone: false,
      partySizeInfo: '',
      minDate: new Date(2024, 6, 24), // July 24th, 2024
      maxDate: new Date(2024, 6, 31), // July 31st, 2024;
    };
  }

  recoverPreviousReservation(reservationSummary: reservationNotConfirmed): void {
    this.reservation.selectedDate = reservationSummary.selectedDate;
    this.reservation.selectedTime = reservationSummary.selectedTime;
    this.reservation.name = reservationSummary.name;
    this.reservation.email = reservationSummary.email;
    this.reservation.phone = reservationSummary.phone;
    this.reservation.partySize = reservationSummary.partySize;
    this.reservation.selectedRegion = reservationSummary.selectedRegion;
    this.reservation.children = reservationSummary.children;
    this.reservation.maxPartySize = reservationSummary.maxPartySize;
    this.reservation.smoking = reservationSummary.smoking;
    this.reservation.birthday = reservationSummary.birthday;
    this.reservation.isValidEmail = reservationSummary.isValidEmail;
    this.reservation.isValidPhone = reservationSummary.isValidPhone;
    this.reservation.birthdayName = reservationSummary.birthdayName;
    this.reservation.partySizeInfo = reservationSummary.partySizeInfo;
    this.reservation.minDate = reservationSummary.minDate;
    this.reservation.maxDate = reservationSummary.maxDate;
  }

  initFormData(reservationSummary: reservationNotConfirmed | undefined): void {
    // Available time slots
    this.timeSlots = this.calculateTimeSlots(
      RESERVATION_CONSTANTS.RESERVATION_OPEN_TIME,
      RESERVATION_CONSTANTS.RESERVATION_CLOSE_TIME
    );
    // Available regions and their details
    this.regions = [
      {
        name: RESERVATION_CONSTANTS.MAIN_HALL_REGION_NAME,
        maxPartySize: RESERVATION_CONSTANTS.MAIN_HALL_PARTY_SIZE,
        smokingAllowed: false,
        childrenAllowed: true,
      },
      {
        name: RESERVATION_CONSTANTS.BAR_REGION_NAME,
        maxPartySize: RESERVATION_CONSTANTS.BAR_PARTY_SIZE,
        smokingAllowed: false,
        childrenAllowed: false,
      },
      {
        name: RESERVATION_CONSTANTS.RIVERSIDE_REGION_NAME,
        maxPartySize: RESERVATION_CONSTANTS.RIVERSIDE_PARTY_SIZE,
        smokingAllowed: false,
        childrenAllowed: true,
      },
      {
        name: RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_REGION_NAME,
        maxPartySize: RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_PARTY_SIZE,
        smokingAllowed: true,
        childrenAllowed: false,
      },
    ];

    // Init reservation
    this.initReservation();

    if (reservationSummary !== undefined) {
      // Recover the previous reservation to edit some data
      this.recoverPreviousReservation(reservationSummary);
    }

    this.isDataLoaded = true;
  }

  /**
   * Calculates the time slots available
   * @param startTime opening reservation time
   * @param endTime end reservation time
   * @returns time slots
   */
  calculateTimeSlots(startTime: string, endTime: string): TimeSlot[] {
    const timeSlots: TimeSlot[] = [];
    const formatTime = (date: Date) =>
      `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    const startDate = new Date();
    startDate.setHours(parseInt(startTime.split(':')[0], 10));
    startDate.setMinutes(parseInt(startTime.split(':')[1], 10));

    const endDate = new Date();
    endDate.setHours(parseInt(endTime.split(':')[0], 10));
    endDate.setMinutes(parseInt(endTime.split(':')[1], 10));

    let currentDate = startDate;
    while (currentDate < endDate) {
      const formattedTime = formatTime(currentDate);
      const timeSlot: TimeSlot = {
        name: formattedTime,
        code: formattedTime,
      };
      timeSlots.push(timeSlot);
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    return timeSlots;
  }

  /**
   * Checks if input email is valid
   * @param newEmail user email
   */
  handleInputEmail(newEmail: string) {
    this.emailRegex.test(newEmail) === true
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
    return this.reservation.selectedRegion.name ==
      RESERVATION_CONSTANTS.BAR_REGION_NAME ||
      this.reservation.selectedRegion.name ==
        RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_REGION_NAME
      ? false
      : true;
  }

  resetRegionRelatedFormData(): void {
    this.reservation.partySize = 1;
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
        this.reservation.partySizeInfo =
          RESERVATION_CONSTANTS.BAR_PARTY_SIZE_INFO;
        this.reservation.maxPartySize = RESERVATION_CONSTANTS.BAR_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
      case RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_REGION_NAME:
        this.reservation.partySizeInfo =
          RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_PARTY_SIZE_INFO;
        this.reservation.maxPartySize =
          RESERVATION_CONSTANTS.RIVERSIDE_SMOKING_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
      case RESERVATION_CONSTANTS.MAIN_HALL_REGION_NAME:
        this.reservation.partySizeInfo =
          RESERVATION_CONSTANTS.MAIN_HALL_PARTY_SIZE_INFO;
        this.reservation.maxPartySize =
          RESERVATION_CONSTANTS.MAIN_HALL_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
      case RESERVATION_CONSTANTS.RIVERSIDE_REGION_NAME:
        this.reservation.partySizeInfo =
          RESERVATION_CONSTANTS.RIVERSIDE_PARTY_SIZE_INFO;
        this.reservation.maxPartySize =
          RESERVATION_CONSTANTS.RIVERSIDE_PARTY_SIZE;
        this.resetRegionRelatedFormData();
        break;
    }
  }

  /**
   * Jumps to the reservation summary component
   */
  showReservationSummary() {
    this.reservationService.reservationNotConfirmed = {
      selectedDate: this.reservation.selectedDate,
      selectedTime: {
        name: this.reservation.selectedTime?.name,
        code: this.reservation.selectedTime?.code,
      },
      name: this.reservation.name,
      email: this.reservation.email,
      phone: this.reservation.phone,
      partySize: this.reservation.partySize,
      selectedRegion: this.reservation.selectedRegion,
      maxPartySize: this.reservation.maxPartySize,
      children: this.reservation.children,
      smoking: this.reservation.smoking,
      birthday: this.reservation.birthday,
      birthdayName: this.reservation.birthdayName,
      isValidEmail: this.reservation.isValidEmail,
      isValidPhone: this.reservation.isValidPhone,
      partySizeInfo: this.reservation.partySizeInfo,
      minDate: this.reservation.minDate,
      maxDate: this.reservation.maxDate,
    };
    this.router.navigate(['/reservation-summary']);
  }
}
