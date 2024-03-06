import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/common/constants';
import {
  Region,
  TimeSlot,
} from 'src/app/core/interfaces/reservation.interface';
import { ReservationKafe } from 'src/app/core/services/reservation-kafe.service';

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  // Available time slots
  timeSlots!: TimeSlot[];
  // Available regions and their details
  regions!: Region[];

  // User input variables
  selectedDate!: Date;
  selectedTime!: TimeSlot;
  name!: string;
  email!: string;
  phone!: string;
  partySize!: number;
  selectedRegion!: Region;
  children!: number;
  maxPartySize!: number; //Main hall init
  smoking!: boolean;
  birthday!: boolean;
  isValidEmail!: boolean;
  isValidPhone!: boolean;
  birthdayName!: string;
  partySizeInfo!: string;
  emailRegex!: RegExp;
  minDate!: Date;
  maxDate!: Date;
  isDataLoaded!: boolean;

  constructor(private reservationService: ReservationKafe) {}

  ngOnInit(): void {
    this.isDataLoaded = false;
    this.initFormData();
    this.isDataLoaded = true;
  }

  initFormData(): void {
    // Available time slots
    this.timeSlots = this.calculateTimeSlots(
      Reservation.RESERVATION_OPEN_TIME,
      Reservation.RESERVATION_CLOSE_TIME
    );
    this.timeSlots.unshift({
      code: '0',
      name: 'Select a time slot',
    });
    // Available regions and their details
    this.regions = [
      {
        name: Reservation.MAIN_HALL_REGION_NAME,
        maxPartySize: Reservation.MAIN_HALL_PARTY_SIZE,
        smokingAllowed: false,
        childrenAllowed: true,
      },
      {
        name: Reservation.BAR_REGION_NAME,
        maxPartySize: Reservation.BAR_PARTY_SIZE,
        smokingAllowed: false,
        childrenAllowed: false,
      },
      {
        name: Reservation.RIVERSIDE_REGION_NAME,
        maxPartySize: Reservation.RIVERSIDE_PARTY_SIZE,
        smokingAllowed: false,
        childrenAllowed: true,
      },
      {
        name: Reservation.RIVERSIDE_SMOKING_REGION_NAME,
        maxPartySize: Reservation.RIVERSIDE_SMOKING_PARTY_SIZE,
        smokingAllowed: true,
        childrenAllowed: false,
      },
    ];

    // User input variables
    this.selectedDate = new Date(2024, 6, 24);
    this.selectedTime = this.timeSlots[0];
    this.name = '';
    this.email = '';
    this.phone = '';
    this.partySize = Reservation.MIN_PARTY_SIZE;
    this.selectedRegion = this.regions[0];
    this.children = 0;
    this.maxPartySize = Reservation.MAIN_HALL_PARTY_SIZE; //Main hall init
    this.smoking = false;
    this.birthday = false;
    this.isValidEmail = false;
    this.isValidPhone = false;
    this.birthdayName = '';
    this.partySizeInfo = Reservation.MAIN_HALL_PARTY_SIZE_INFO;
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.minDate = new Date(2024, 6, 24); // July 24th, 2024
    this.maxDate = new Date(2024, 6, 31); // July 31st, 2024;
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
      ? (this.isValidEmail = true)
      : (this.isValidEmail = false);
  }

  /**
   * Reset time slot selected when date changes
   * @param event
   */
  onDateSelect(event: any) {
    this.selectedTime = this.timeSlots[0];
  }

  /**
   * Checks if the children party is allowed based on the selected region name
   * @returns true or false
   */
  isChildrenPartyAllowed(): boolean {
    return this.selectedRegion.name == Reservation.BAR_REGION_NAME ||
      this.selectedRegion.name == Reservation.RIVERSIDE_SMOKING_REGION_NAME
      ? false
      : true;
  }

  /**
   * Updates the party size limit based on the user selected region
   */
  updatePartySizeLimit(): void {
    switch (this.selectedRegion.name) {
      case Reservation.BAR_REGION_NAME:
        this.partySizeInfo = Reservation.BAR_PARTY_SIZE_INFO;
        this.maxPartySize = Reservation.BAR_PARTY_SIZE;
        this.partySize = 1;
        this.smoking = false;
        this.birthday = false;
        this.birthdayName = '';
        break;
      case Reservation.RIVERSIDE_SMOKING_REGION_NAME:
        this.partySizeInfo = Reservation.RIVERSIDE_SMOKING_PARTY_SIZE_INFO;
        this.maxPartySize = Reservation.RIVERSIDE_SMOKING_PARTY_SIZE;
        this.partySize = 1;
        this.birthday = false;
        this.birthdayName = '';
        break;
      case Reservation.MAIN_HALL_REGION_NAME:
        this.partySizeInfo = Reservation.MAIN_HALL_PARTY_SIZE_INFO;
        this.maxPartySize = Reservation.MAIN_HALL_PARTY_SIZE;
        this.partySize = 1;
        this.birthday = false;
        this.birthdayName = '';
        this.smoking = false;
        break;
      case Reservation.RIVERSIDE_REGION_NAME:
        this.partySizeInfo = Reservation.RIVERSIDE_PARTY_SIZE_INFO;
        this.maxPartySize = Reservation.RIVERSIDE_PARTY_SIZE;
        this.partySize = 1;
        this.birthday = false;
        this.birthdayName = '';
        this.smoking = false;
        break;
    }
  }

  checkIsFormValid(): boolean {
    return false;
  }

  /**
   * Jumps to the reservation summary component
   */
  showReservationSummary() {
    this.reservationService.reservation = {
      date: this.selectedDate,
      time: { name: this.selectedTime?.name, code: this.selectedTime?.code },
      name: this.name,
      email: this.email,
      phone: this.phone,
      partySize: this.partySize,
      region: this.selectedRegion,
      children: this.children,
      smoking: this.smoking,
      birthday: this.birthday,
      birthdayName: this.birthdayName,
    };
    //TODO: implementar la ruta a reseervation summary
  }
}
