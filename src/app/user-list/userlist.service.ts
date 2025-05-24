import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    // add other fields as needed from the API response
}
@Injectable({
  providedIn: 'root'
})
export class UserlistService {

    private apiUrl = 'https://api.escuelajs.co/api/v1/users';

    constructor(private http: HttpClient) { }

    fetchUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
}