import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
];

@NgModule({
    declarations: [UserListComponent],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      ToastrModule.forRoot(),
      RouterModule.forChild(routes)
  ]
})
export class UserlistModule { }
