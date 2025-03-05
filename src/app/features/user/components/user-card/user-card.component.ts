import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {MatRippleModule} from '@angular/material/core';
import { IUser } from '../../../../shared/interfaces';
import { NamePipe } from '../../pipes/user-fullname.pipe';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-card',
  imports: [MatRippleModule, NamePipe,  RouterModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input({required: true}) user!:IUser;
  @Output() onUserDeleteEvent = new EventEmitter<IUser>();

  handleDeleteEvent() {
    this.onUserDeleteEvent.emit(this.user);
  }

 }
