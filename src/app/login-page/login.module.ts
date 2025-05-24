import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: LoginPageComponent
    },
];

@NgModule({
    declarations: [LoginPageComponent],  // declare your component here
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
        

    ],
})
export class LoginModule { }