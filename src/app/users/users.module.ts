import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from "@ngrx/store"
import { UserReducer } from "./state/user.reducer"
import { MaterialModule } from '../mat.module';
import { EffectsModule , Actions } from"@ngrx/effects"
import { UserEffect } from './state/user.effects';
import { FormsModule } from '@angular/forms';
import { UserDeleteComponent } from './user-delete/user-delete.component';

const usersRoutes: Routes = [
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
  declarations: [
    UserAddComponent,
    UserEditComponent,
    UserListComponent,
    UserDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(usersRoutes),
    StoreModule.forFeature("users", UserReducer),
    EffectsModule.forFeature([UserEffect]),
    FormsModule
  ],
  exports: [
    UserListComponent
  ]

})
export class UsersModule { }
