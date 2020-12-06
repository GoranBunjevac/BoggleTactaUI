import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatGridListModule, MatSnackBarModule],
  exports: [MatButtonModule, MatCardModule, MatGridListModule, MatSnackBarModule],
})
export class MaterialModule {}
