import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SnackbarService {
  constructor(
    private _translateService: TranslateService,
    private _snackService: MatSnackBar
  ) {}

  showError(message: string) {
    this._snackService.open(
      this._translateService.instant(message),
      this._translateService.instant('Dismiss'),
      {
        duration: 5000,
        panelClass: 'snackbar-error',
        verticalPosition: 'top',
        horizontalPosition: 'right',
      }
    );
  }

  showSuccessMessage(message: string) {
    this._snackService.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success',
    });
  }
}
