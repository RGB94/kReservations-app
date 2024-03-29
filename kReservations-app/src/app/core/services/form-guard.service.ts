import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ReservationComponent } from 'src/app/routes/kreservations/reservation/reservation.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<ReservationComponent> {
  constructor() {}

  canDeactivate(component: ReservationComponent): boolean {
    if (!component.reservationForm.valid) {
      return false;
    }
    return true;
  }
}
