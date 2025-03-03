import { Routes } from '@angular/router';
import { UserListComponent } from './features/user/components/user-list/user-list.component';
import { UserDetailComponent } from './features/user/components/user-detail/user-detail.component';
import { UserCreateComponent } from './features/user/components/user-create/user-create.component';
import { PageLayoutComponent } from './shared/layout/page-layout/page-layout.component';

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
          path: 'user/:id',
          component: UserDetailComponent
        },
        {
          path: 'newuser',
          component: UserCreateComponent
        },
        {
          path: 'updateuser/:id',
          component: UserCreateComponent
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
