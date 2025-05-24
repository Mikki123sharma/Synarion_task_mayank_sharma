import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({

    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
    title = 'task-project';

    ngOnInit(): void {
        if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
            window.addEventListener('storage', (event) => {
                if (event.key === 'logout-event') {
                    // Logout this tab
                    sessionStorage.clear();
                    window.location.href = '/login';
                }
            });
        }
    }
}
