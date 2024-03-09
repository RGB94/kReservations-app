import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng-lts/inputtext';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { DropdownModule } from 'primeng-lts/dropdown';
import { CalendarModule } from 'primeng-lts/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    BrowserAnimationsModule,
  ],
})
export class SharedModule {}
