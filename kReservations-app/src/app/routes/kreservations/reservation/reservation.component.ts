import { Component, OnInit } from '@angular/core';

interface Region {
  name: string;
  maxPartySize: number;
  smokingAllowed: boolean;
  childrenAllowed: boolean;
}

interface TimeSlot {
  name: string;
  code: string;
}

@Component({
  selector: 'reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  // Available time slots
  timeSlots: TimeSlot[] = [];
  // Available regions and their details
  regions: Region[] = [
    {
      name: 'Main Hall',
      maxPartySize: 12,
      smokingAllowed: false,
      childrenAllowed: true,
    },
    {
      name: 'Bar',
      maxPartySize: 4,
      smokingAllowed: false,
      childrenAllowed: false,
    },
    {
      name: 'Riverside',
      maxPartySize: 8,
      smokingAllowed: false,
      childrenAllowed: true,
    },
    {
      name: 'Riverside (smoking allowed)',
      maxPartySize: 6,
      smokingAllowed: true,
      childrenAllowed: false,
    },
  ];

  // User input variables
  selectedDate: Date = new Date();
  selectedTime: TimeSlot | undefined = undefined;
  name: string = '';
  email: string = '';
  phone: string = '';
  partySize: number = 1;
  selectedRegion: Region = this.regions[0];
  children: number = 0;
  smoking: boolean = false;
  birthday: boolean = false;
  isValidEmail: boolean = false;
  isValidPhone: boolean = false;
  birthdayName: string = '';
  //TODO: crear las constantes en el fichero de constantes y luego importarlas aqui
  partySizeInfo: string = 'Seating 12 or fewer per table';
  emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor() {}

  //TODO: rellenar comentarios de los metodos
  ngOnInit(): void {
    this.timeSlots = this.calculateTimeSlots('18:00', '22:00');
  }

  /**
   *
   * @param startTime
   * @param endTime
   * @returns
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
   *
   * @param newEmail
   */
  handleInputEmail(newEmail: string) {
    this.emailRegex.test(newEmail) === true
      ? (this.isValidEmail = true)
      : (this.isValidEmail = false);
  }

  /**
   *
   * @param event
   */
  onDateSelect(event: any) {
    this.selectedDate = event.value;
  }

  /**
   *
   * @returns
   */
  isChildrenPartyAllowed(): boolean {
    return this.selectedRegion.name == 'Bar' ||
      this.selectedRegion.name == 'Riverside (smoking allowed)'
      ? false
      : true;
  }

  /**
   *
   */
  updatePartySizeLimit(): void {
    switch (this.selectedRegion.name) {
      case 'Bar':
        this.partySizeInfo = 'Seating 4 or fewer per table';
        break;
      case 'Riverside (smoking allowed)':
        this.partySizeInfo = 'Seating 6 or fewer per table';
        break;
      case 'Main Hall':
        this.partySizeInfo = 'Seating 12 or fewer per table';
        break;
      case 'Riverside':
        this.partySizeInfo = 'Seating 8 or fewer per table';
        break;
    }
  }

  /**
   *
   */
  showReservationSummary() {
    //TODO: Implement logic to submit reservation data to backend or display confirmation message
    console.log('Reservation details:', {
      date: this.selectedDate,
      time: this.selectedTime,
      name: this.name,
      email: this.email,
      phone: this.phone,
      partySize: this.partySize,
      region: this.selectedRegion,
      children: this.children,
      smoking: this.smoking,
      birthday: this.birthday,
      birthdayName: this.birthdayName,
    });
  }
}
