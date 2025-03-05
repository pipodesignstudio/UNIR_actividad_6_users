import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { IUser } from '../../../../shared/interfaces';
import { UsersApiService } from '../../../../shared/services/users-api.service';
import { UserFormComponent } from "../user-form/user-form.component";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NamePipe } from "../../pipes/user-fullname.pipe";


@Component({
  selector: 'app-user-create-or-update',
  imports: [UserFormComponent, MatProgressBarModule, NamePipe],
  templateUrl: './user-create-or-update.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateOrUpdateComponent implements OnInit {
  @Input() _id: string | undefined = undefined;
    private userService = inject(UsersApiService);
  

  public isLoading = signal<boolean>(true);

  public user: IUser | null = null;
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    if (!this._id) {
      this.isLoading.set(false);
      return;
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
}
