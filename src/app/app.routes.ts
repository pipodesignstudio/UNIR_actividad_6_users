import { Routes } from '@angular/router';
import { UserListComponent } from './features/user/components/user-list/user-list.component';
import { UserDetailComponent } from './features/user/components/user-detail/user-detail.component';
import { PageLayoutComponent } from './shared/layout/page-layout/page-layout.component';
import { UserCreateOrUpdateComponent } from './features/user/components/user-create-or-update/user-create-or-update.component';

export const routes: Routes = [
    {
      path: '',
      component: PageLayoutComponent, 
      children: [ 
        {
          path: 'home',
          component: UserListComponent
        },
        {
          path: 'user/:_id',
          component: UserDetailComponent
        },
        {
          path: 'newuser',
          component: UserCreateOrUpdateComponent
        },
        {
          path: 'updateuser/:_id',
          component: UserCreateOrUpdateComponent
        },
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
      ]
    },
    {
      path: '**',
      redirectTo: 'home'
    }
  ];
