import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-layout',
  imports: [NavbarComponent, RouterModule],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent { }
