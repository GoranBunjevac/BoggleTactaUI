import { SnackbarService } from './../../core/services/snackbar.service';
import { SinglePlayerRoutingModule } from './single-player-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { SinglePlayerComponent } from './single-player.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { SinglePlayerService } from '../single-player/single-player.service';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [SinglePlayerComponent],
  imports: [CommonModule, SharedModule, MaterialModule, SinglePlayerRoutingModule],
  providers: [SinglePlayerService, TranslateService, SnackbarService],
})
export class SinglePlayerModule {}
