import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { UserDetailLoadingPlaceholderComponent } from "../user-detail-loading-placeholder/user-detail-loading-placeholder.component";
import { Router, RouterModule } from '@angular/router';
import { UsersApiService } from '../../../../shared/services/users-api.service';
import { IUser } from '../../../../shared/interfaces';
import { NamePipe } from "../../pipes/user-fullname.pipe";
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, UserDetailLoadingPlaceholderComponent, RouterModule, NamePipe],
  templateUrl: './user-detail.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit{
  @Input() _id:string | undefined = undefined;

  private userService = inject(UsersApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  public isLoading = signal<boolean>(true);

  public user: IUser | null = null;
  hasError = signal<boolean>(false);

  async ngOnInit(): Promise<void> {
    if(!this._id) {
       this.router.navigate([''])
    } else {
      this.userService.getUserById(this._id).then(u => {
        if ('error' in u) {
          this.hasError.set(true);
          this.isLoading.set(false);
          return;
        }
        this.user = u;
        this.isLoading.set(false);
      })
    }
  }

   onUserDelete() {
      this.dialog.open(UserDeleteDialogComponent, {
        data: this.user
      })
    }

 }
