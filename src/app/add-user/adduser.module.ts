import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


const routes: Routes = [
    {
        path: '',
        component: AddUserComponent,

    },
];

@NgModule({
    declarations: [AddUserComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterModule.forChild(routes)
    ]
})
export class AdduserModule { }
