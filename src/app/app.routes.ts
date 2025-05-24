import { Routes } from '@angular/router';
import { FullComponent } from './full/full.component';

export const routes: Routes = [
    { path: 'login', loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule) },
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'userlist',
                loadChildren: () => import('./user-list/userlist.module').then(m => m.UserlistModule)
            },
            {
                path: 'Adduser',
                loadChildren: () => import('./add-user/adduser.module').then(m => m.AdduserModule)
            },


            { path: '**', redirectTo: 'login' }
        ]
    }
]
