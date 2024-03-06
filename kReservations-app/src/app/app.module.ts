import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { KreservationsModule } from './routes/kreservations/kreservations.module';
import { ReservationSummaryComponent } from './routes/kreservations/reservation-summary/reservation-summary.component';
registerLocaleData(es);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, ReservationSummaryComponent],
  imports: [BrowserModule, AppRoutingModule, KreservationsModule, SharedModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-ES',
    },
  ],
})
export class AppModule {}
