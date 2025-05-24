import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


@Component({
    selector: 'app-full',
    templateUrl: './full.component.html',
    styleUrl: './full.component.scss',
    standalone: true,
    imports: [RouterOutlet, ToastrModule, CommonModule, FormsModule]
})
export class FullComponent {
    sidebarOpen = true;

    constructor(
        private router: Router
    ) { }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }


    NavigateTo(url: any) {
        console.log(url, 'url');
        this.router.navigate([url]);
    }
    logout() {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
        }
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

}
