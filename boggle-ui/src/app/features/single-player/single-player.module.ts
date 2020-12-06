import { CountDownComponent } from './../count-down/count-down.component';
import { SinglePlayerRoutingModule } from './single-player-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { SinglePlayerComponent } from './single-player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { SinglePlayerService } from '../single-player/single-player.service';

@NgModule({
  declarations: [SinglePlayerComponent, CountDownComponent],
  imports: [CommonModule, SharedModule, MaterialModule, SinglePlayerRoutingModule],
  providers: [SinglePlayerService],
})
export class SinglePlayerModule {}
