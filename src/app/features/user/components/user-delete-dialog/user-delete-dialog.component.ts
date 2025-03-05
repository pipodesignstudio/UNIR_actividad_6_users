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
import { ApiError } from '../../../../shared/interfaces/api-error.interface';
import { IUser } from '../../../../shared/interfaces';
import { Router } from '@angular/router';

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
  private router = inject(Router);

  public isDeleting = signal<boolean>(false);
  public error: ApiError | null = null;


  durationInSeconds = 5;

  openSnackBar() {
    this.snackBar.open('❌ Usuario borrado correctamente', 'Cerrar', {
      duration: this.durationInSeconds * 1000,
    });
  }

  close() {
    this.dialog.getDialogById(this.container._config.id ?? '')?.close();
  }

  async onDelete() {
    this.isDeleting.set(true);
    const resp:IUser | ApiError = await this.userService.deleteUserById(this.user._id);
    if ('error' in resp) { 
      this.error = resp;
      this.isDeleting.set(false);
      return;
    } else {
      this.openSnackBar();
      this.close();
      this.isDeleting.set(false);
      this.router.navigate(['/']);  
    }
  }

 }
