import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: false,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    sidebarOpen = true;

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

}

