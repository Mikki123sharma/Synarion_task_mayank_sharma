import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    access_token: string; // assuming response has token, adjust accordingly
    refresh_token: string
    // ...other properties from response
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private apiUrl = 'https://api.escuelajs.co/api/v1/auth/login';

    constructor(private http: HttpClient) { }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, data);
    }
}   
