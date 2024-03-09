export interface Reservation {
  selectedDate: Date;
  selectedTime: TimeSlot;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  selectedRegion: Region;
  maxPartySize: number;
  children: number;
  smoking: boolean;
  birthday: boolean;
  birthdayName: string;
  isValidEmail: boolean;
  isValidPhone: boolean;
  partySizeInfo: string;
  minDate: Date;
  maxDate: Date;
}

export interface Region {
  name: string;
  maxPartySize: number;
  smokingAllowed: boolean;
  childrenAllowed: boolean;
}

export interface TimeSlot {
  name: string;
  code: string;
}
