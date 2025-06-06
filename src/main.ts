import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';


bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideRouter(routes),
        provideAnimations() // Required for ngx-toastr
    ]
});