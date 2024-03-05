export interface Reservation {
  date: Date;
  time: TimeSlot;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  region: Region;
  children: number;
  smoking: boolean;
  birthday: boolean;
  birthdayName: string;
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
