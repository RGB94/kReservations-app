export class RESERVATION_CONSTANTS {
  public static MAIN_HALL_TABLE_PARTY_SIZE: number = 12;
  public static BAR_TABLE_PARTY_SIZE: number = 4;
  public static RIVERSIDE_TABLE_PARTY_SIZE: number = 8;
  public static RIVERSIDE_TABLE_SMOKING_PARTY_SIZE: number = 6;
  public static MIN_PARTY_SIZE: number = 1;
  public static AVAILABLE_TABLES_MAIN_HALL: number = 4;
  public static AVAILABLE_TABLES_BAR: number = 2;
  public static AVAILABLE_TABLES_RIVERSIDE: number = 3;
  public static AVAILABLE_TABLES_RIVERSIDE_SMOKING: number = 3;
  public static MAIN_HALL_TABLE_PARTY_SIZE_INFO: string = 'Seating 12 or fewer per table';
  public static BAR_TABLE_PARTY_SIZE_INFO: string = 'Seating 4 or fewer per table';
  public static RIVERSIDE_TABLE_PARTY_SIZE_INFO: string = 'Seating 8 or fewer per table';
  public static RIVERSIDE_TABLE_SMOKING_PARTY_SIZE_INFO: string = 'Seating 6 or fewer per table';
  public static BAR_REGION_NAME: string = 'Bar';
  public static MAIN_HALL_REGION_NAME: string = 'Main Hall';
  public static RIVERSIDE_REGION_NAME: string = 'Riverside';
  public static RIVERSIDE_SMOKING_REGION_NAME: string = 'Riverside (smoking allowed)';
}

export class API_PATH {
  public static RESERVATIONS_PATH: string = '/reservations';
  public static TIME_SLOTS_PATH: string = '/timeSlots';
  public static REGIONS_PATH: string = '/regions';
}
