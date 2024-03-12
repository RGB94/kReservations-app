import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RESERVATION_CONSTANTS } from 'src/app/common/constants';
import { Region, ActiveTableReservation, TimeSlot } from 'src/app/core/interfaces/reservation.interface';
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

  reservation!: ActiveTableReservation;
  isDataLoaded: boolean = false;

  constructor(private reservationService: ReservationKafe, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.initFormData(this.reservationService?.activeTableReservation);
  }

  /**
   * Inits the reservation
   */
  initReservation(): void {
    this.reservation = {
      selectedDate: new Date(2024, 6, 24),
      selectedTime: this.timeSlots[0],
      name: '',
      email: '',
      phone: '',
      partySize: RESERVATION_CONSTANTS.MIN_PARTY_SIZE,
      selectedRegion: this.regions[0],
      tableCapacity: RESERVATION_CONSTANTS.MAIN_HALL_TABLE_PARTY_SIZE,
      children: 0,
      smoking: false,
      birthday: false,
      birthdayName: '',
      isValidEmail: false,
      partySizeInfo: '',
      minDate: new Date(2024, 6, 24), // July 24th, 2024
      maxDate: new Date(2024, 6, 31) // July 31st, 2024;
    };
  }

  /**
   * Sets active reservation to edit again
   * @param activeTableReservation active reservation
   */
  setPreviousReservation(activeTableReservation: ActiveTableReservation): void {
    this.reservation = { ...activeTableReservation };
  }

  /**
   * Inits all the form data
   * @param activeTableReservation active reservation
   */
  initFormData(activeTableReservation: ActiveTableReservation | undefined): void {
    forkJoin([this.apiService.getReservationTimeSlots(), this.apiService.getRestaurantRegions()]).subscribe({
      next: (response: any) => {
        this.timeSlots = response[0];
        this.regions = response[1];

        // Init reservation
        this.initReservation();

        if (activeTableReservation !== undefined) {
          this.setPreviousReservation(activeTableReservation);
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
    const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Regular expression for email
    regex.test(newEmail) === true ? (this.reservation.isValidEmail = true) : (this.reservation.isValidEmail = false);
  }

  /**
   * Reset time slot selected when date changes
   * @param event
   */
  onDateSelect(event: any) {
    this.reservation.selectedTime = this.timeSlots[0];
  }

  /**
   * Prevent any character that is not a letter be entered
   * @param event KeyboardEvent
   */
  onKeyPress(event: KeyboardEvent) {
    const char = event.key; // Get the character from the event
    const regex = new RegExp(/^[a-zA-Z]+$/); // Regular expression for letters only

    if (!regex.test(char)) {
      event.preventDefault(); // Prevent invalid character from being entered
    }
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

  /**
   * Reset region related form data
   */
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
   * Checks if the submit button should be enabled or disabled
   * @returns true or false
   */
  isSubmitDisabled(): boolean {
    return (
      this.reservationForm?.invalid ||
      this.reservation?.children >= this.reservation?.partySize ||
      !this.reservation.isValidEmail
    );
  }

  /**
   * Jumps to the reservation summary component
   */
  showReservationSummary() {
    this.reservationService.activeTableReservation = { ...this.reservation };
    this.router.navigate(['/reservation-summary']);
  }
}
