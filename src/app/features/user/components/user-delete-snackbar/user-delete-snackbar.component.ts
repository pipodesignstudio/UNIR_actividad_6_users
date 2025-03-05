import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-delete-snackbar',
  imports: [],
  templateUrl: './user-delete-snackbar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDeleteSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

 }
