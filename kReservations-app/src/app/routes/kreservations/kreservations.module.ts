import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationOkComponent } from './reservation-ok/reservation-ok.component';
import { ReservationNokComponent } from './reservation-nok/reservation-nok.component';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    ReservationComponent,
    ReservationOkComponent,
    ReservationNokComponent,
    ReservationSummaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class KreservationsModule { }
