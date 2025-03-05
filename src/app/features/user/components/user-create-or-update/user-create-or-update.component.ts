import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-create-or-update',
  imports: [],
  templateUrl: './user-create-or-update.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateOrUpdateComponent {
  @Input() _id :string | undefined = undefined;
 }
