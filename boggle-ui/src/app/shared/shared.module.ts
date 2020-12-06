import { CommonModule } from '@angular/common';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FormatTimePipe],
  imports: [FlexLayoutModule, CommonModule],
  exports: [FlexLayoutModule, FormatTimePipe],
})
export class SharedModule {}
