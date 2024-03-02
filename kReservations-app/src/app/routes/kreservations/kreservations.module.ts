import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationOkComponent } from './reservation-ok/reservation-ok.component';
import { ReservationNokComponent } from './reservation-nok/reservation-nok.component';



@NgModule({
  declarations: [
    ReservationComponent,
    ReservationOkComponent,
    ReservationNokComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KreservationsModule { }
