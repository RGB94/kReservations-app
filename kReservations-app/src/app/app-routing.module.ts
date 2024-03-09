import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './routes/kreservations/reservation/reservation.component';
import { ReservationSummaryComponent } from './routes/kreservations/reservation-summary/reservation-summary.component';
import { FormGuard } from './core/services/form-guard.service';
import { SummaryGuard } from './core/services/summary-guard.service';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationComponent,
    canDeactivate: [FormGuard],
  },
  {
    path: 'reservation-summary',
    component: ReservationSummaryComponent,
    canDeactivate: [SummaryGuard],
  },
  {
    path: '**',
    redirectTo: 'reservation',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      // initialNavigation: 'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
