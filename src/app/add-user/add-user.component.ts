import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserlistService } from '../user-list/userlist.service';
import { NgForm } from '@angular/forms';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
@Component({
    selector: 'app-add-user',
    standalone: false,
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
    users: User[] = [];
    user: User = { id: 0, name: '', email: '', role: '' };

    navigatedData: any;

    constructor(
        private router: Router,
        private userService: UserlistService,
    ) {
        this.navigatedData = this.router.getCurrentNavigation()?.extras.state;
    }
    ngOnInit() {
        if (this.navigatedData) {
            this.user = this.navigatedData.user;
        }
        const storedUsers = this.getUsersFromStorage();
        if (storedUsers.length) {
            this.users = storedUsers;
        } else {
            this.userService.fetchUsers().subscribe((users: User[]) => {
                this.users = users;
                this.saveUsersToStorage(users);
            });
        }

    }


    getUsersFromStorage(): User[] {
        if (typeof sessionStorage !== 'undefined') {
            const usersJson = sessionStorage.getItem('userList');
            return usersJson ? JSON.parse(usersJson) : [];
        }
        return [];
    }


    saveUsersToStorage(users: User[]) {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('userList', JSON.stringify(users));
        }

    }


    getUserListFromSession(): User[] {
        if (typeof sessionStorage === 'undefined') {
            return [];
        }
        const storedUsers = sessionStorage.getItem('userList');
        return storedUsers ? JSON.parse(storedUsers) : [];
    }


    saveUserListToSession(): void {
        if (typeof sessionStorage === 'undefined') {
            return;
        }
        sessionStorage.setItem('userList', JSON.stringify(this.users));
    }


    onSubmit(userForm: NgForm): void {
        if (userForm?.invalid) {
            return;
        }

        if (this.user.id) {

            this.users = this.users.map(u => u.id === this.user.id ? { ...this.user } : u);
        } else {

            this.user.id = Date.now();
            this.users.push({ ...this.user });
        }
        this.saveUserListToSession();
        this.resetForm();

        userForm?.resetForm(this.user);
        if (this.navigatedData) {
            this.router.navigate(['userlist']);
        }
    }


    editUser(user: User): void {
        this.user = { ...user };
    }


    deleteUser(id: number): void {
        this.users = this.users.filter(u => u.id !== id);
        this.saveUserListToSession();
    }


    resetForm(): void {
        this.user = { id: 0, name: '', email: '', role: '' };
    }
}