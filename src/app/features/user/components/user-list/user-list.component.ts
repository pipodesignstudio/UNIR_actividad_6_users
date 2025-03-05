import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { IUser } from '../../../../shared/interfaces';
import { UsersApiService } from '../../../../shared/services/users-api.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { UserCardComponent } from "../user-card/user-card.component";
import {
  MatDialog,
} from '@angular/material/dialog';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatProgressSpinnerModule, MatPaginatorModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public users: IUser[] = [];

  // Como el api sugiere una paginación vamos a hacer una interpretación de cómo se implementaría
  public paginatedUsers: IUser[] = []; // Variable donde almaceno los users de la página

  private userService = inject(UsersApiService);
  private dialog = inject(MatDialog);

  public isLoading = signal<boolean>(true);

  public loadingContainerClasses: string[] = [
    'min-h-[90vh]',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
  ];

  public currentPage = 0; // Para actualizar la paginación
  public pageSize = 8; // Elementos a mostrar por página, se podría hacer un desplegable con opciones

  async ngOnInit(): Promise<void> {
    this.userService.getAllUsers().then((users) => {
      this.users = users;
      this.isLoading.set(false);
      this.updatePaginatedUsers();
    });
  }

  // Método para actualizar los users de la página en función de la página actual y el tamaño de página
  updatePaginatedUsers(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  /*
   En este evento se podría hacer un nuevo fetch para traer la siguiente página del api.
  En este caso simplemente actualizo los índices para volver a hacer el slice y refrescar la página mostrada
  */
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.updatePaginatedUsers();
  }

  onUserDelete(event:IUser) {
    this.dialog.open(UserDeleteDialogComponent, {
      data: event
    })
  }

}
