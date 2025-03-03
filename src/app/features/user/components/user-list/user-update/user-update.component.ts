import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-update',
  imports: [],
  templateUrl: './user-update.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserUpdateComponent { }
