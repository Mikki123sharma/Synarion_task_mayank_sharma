import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login-page',
    standalone: false,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
    loginForm: FormGroup;
    errorMessage = '';

    constructor(private fb: FormBuilder, private login: LoginService, private router: Router) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.login.login(this.loginForm.value).subscribe({
            next: (res) => {
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.setItem('access_token', res.access_token);
                    sessionStorage.setItem('refresh_token', res.refresh_token);
                    sessionStorage.setItem('user', JSON.stringify(this.loginForm.value));
                    // Signal other tabs to logout
                    localStorage.setItem('logout-event', Date.now().toString());
                    this.router.navigate(['/dashboard']);
                }
            },
            error: (err) => {
                this.errorMessage = 'Login failed: ' + (err.error?.message || 'Unknown error');
            }
        });
    }

}
