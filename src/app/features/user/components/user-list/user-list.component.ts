import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/interfaces';
import { UsersApiService } from '../../../../shared/services/users-api.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit{
  public users:IUser[] = [];

  private userService = inject(UsersApiService)

  async ngOnInit(): Promise<void> {
    await this.userService.getAllUsers();
  }
 }
