import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './routes/kreservations/reservation/reservation.component';
import { ReservationSummaryComponent } from './routes/kreservations/reservation-summary/reservation-summary.component';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationComponent,
  },
  {
    path: 'reservation-summary',
    component: ReservationSummaryComponent,
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
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
