import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
{  path: '',
    component: UserListComponent,
    children: [
      {  
        path:'delete',
        component: UserDeleteComponent
      },
      {  
        path:'update',
        component: UserEditComponent
      },
      {  
        path:'add',
        component: UserAddComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProjectRoutingModule { }
