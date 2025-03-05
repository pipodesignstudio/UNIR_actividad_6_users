import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-user-detail-loading-placeholder',
  imports: [RouterModule, MatButtonModule],
  templateUrl: './user-detail-loading-placeholder.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailLoadingPlaceholderComponent { }
