import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { KreservationsModule } from './routes/kreservations/kreservations.module';
import { AddHeaderInterceptor } from './add-header.interceptor';
registerLocaleData(es);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, KreservationsModule, SharedModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
