import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './routes/kreservations/reservation/reservation.component';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationComponent,
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
