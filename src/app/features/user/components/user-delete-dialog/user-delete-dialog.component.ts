import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogActions,
  MatDialogContainer,
  MatDialog,
} from '@angular/material/dialog';
import { NamePipe } from "../../pipes/user-fullname.pipe";
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersApiService } from '../../../../shared/services/users-api.service';
import { UserDeleteSnackbarComponent } from '../user-delete-snackbar/user-delete-snackbar.component';

@Component({
  selector: 'app-user-delete-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatButtonModule, NamePipe, MatDialogActions, MatDialogClose],
  templateUrl: './user-delete-dialog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDeleteDialogComponent {
  user = inject(MAT_DIALOG_DATA);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UsersApiService);
  private dialog = inject(MatDialog);
  private container = inject(MatDialogContainer);

  public isDeleting = signal<boolean>(false);


  durationInSeconds = 5;

  openSnackBar() {
    this.snackBar.openFromComponent(UserDeleteSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  close() {
    this.dialog.getDialogById(this.container._config.id ?? '')?.close();
  }

  onDelete() {
    setTimeout(( ) => this.close(), 1000)
  }

 }
