export interface ActiveTableReservation {
  selectedDate: Date;
  selectedTime: TimeSlot;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  selectedRegion: Region;
  tableCapacity: number;
  children: number;
  smoking: boolean;
  birthday: boolean;
  birthdayName: string;
  isValidEmail: boolean;
  partySizeInfo: string;
  minDate: Date;
  maxDate: Date;
}

export interface TableReservation {
  id: number | undefined;
  day: string | undefined;
  time: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  partySize: number | undefined;
  region: Region | undefined;
  children: number | undefined;
  smoking: boolean | undefined;
  birthday: boolean | undefined;
  birthdayName: string | undefined;
}

export interface Region {
  name: string;
  tableCapacity: number;
  smokingAllowed: boolean;
  childrenAllowed: boolean;
}

export interface TimeSlot {
  name: string;
  code: string;
}
