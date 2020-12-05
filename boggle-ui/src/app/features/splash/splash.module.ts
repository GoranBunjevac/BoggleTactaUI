import { SplashRoutingModule } from './splash-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { SplashComponent } from './splash.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [SplashComponent],
  imports: [CommonModule, SharedModule, MaterialModule, SplashRoutingModule],
})
export class SplashModule {}
