import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';







@NgModule({
  declarations: [
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class UsersModule { }
