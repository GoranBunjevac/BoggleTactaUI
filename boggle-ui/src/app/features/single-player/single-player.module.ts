import { SinglePlayerRoutingModule } from './single-player-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { SinglePlayerComponent } from './single-player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [SinglePlayerComponent],
  imports: [CommonModule, SharedModule, MaterialModule, SinglePlayerRoutingModule],
})
export class SinglePlayerModule {}
