import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';





@NgModule({
    declarations: [
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        ToastrModule.forRoot(),

    ],
    bootstrap: [],
    providers: [
        provideAnimations(), // required animations providers
        provideToastr(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
})
export class AppModule { }