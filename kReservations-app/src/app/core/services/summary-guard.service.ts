import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { ReservationSummaryComponent } from 'src/app/routes/kreservations/reservation-summary/reservation-summary.component';

@Injectable({
  providedIn: 'root'
})
export class SummaryGuard implements CanDeactivate<ReservationSummaryComponent> {
  constructor(private router: Router) {}

  canDeactivate(component: ReservationSummaryComponent): boolean {
    if (component.reservationData === undefined) {
      this.router.navigate(['/reservation']);
      return false;
    }
    return true;
  }
}
