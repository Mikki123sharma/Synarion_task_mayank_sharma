import { Component, OnInit } from '@angular/core';
import { UserlistService } from './userlist.service';
import { Router } from '@angular/router';
export interface User {
    id: number;
    name: string;
    email: string;
    role?: string;
    avatar?: string;
    balnce?: string;
    // add other fields as needed from the API response
}

@Component({
    selector: 'app-user-list',
    standalone: false,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    filteredUsers: User[] = [];
    filterEmail: string = '';
    private userList = 'userList';

    balances = [{ id: 5, balnce: 10.52 }, { id: 7, balnce: 10.52 }, { id: 10, balnce: 10.52 }, { id: 12, balnce: 10.52 }, { id: 25, balnce: 10.52 },
    { id: 35, balnce: 10.52 }, { id: 37, balnce: 10.52 }, { id: 40, balnce: 10.52 }, { id: 75, balnce: 10.52 }, { id: 78, balnce: 10.52 },
    { id: 99, balnce: 10.52 }, { id: 14, balnce: 10.52 }, { id: 18, balnce: 10.52 }, { id: 55, balnce: 10.52 }, { id: 46, balnce: 10.52 }];

    constructor(private userService: UserlistService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        const storedUsers = this.getUsersFromStorage();
        if (storedUsers.length) {
            this.users = storedUsers;
            this.filteredUsers = [...this.users];
        } else {
            this.userService.fetchUsers().subscribe(users => {
                const balanceMap = new Map<number, number>();
                this.balances.forEach(item => balanceMap.set(item.id, item.balnce));

                this.users = users.map((user: any) => ({
                    ...user,
                    balnce: balanceMap.get(user.id) ?? 0  // 0 if no balance found
                }));
                this.filteredUsers = [...this.users];
                this.saveUsersToStorage(this.users);
            });
        }
    }

    getUsersFromStorage(): User[] {
        if (typeof sessionStorage === 'undefined') {
            return [];
        }
        const usersJson = sessionStorage.getItem(this.userList);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    saveUsersToStorage(users: User[]) {
        if (typeof sessionStorage === 'undefined') {
            return;
        }
        sessionStorage.setItem(this.userList, JSON.stringify(users));
    }

    addUser() {
        const newUser: User = {
            id: this.generateId(this.users),
            name: 'New User',
            email: 'newuser@example.com',
            role: 'user',
            avatar: ''
        };
        this.users.push(newUser);
        this.saveUsersToStorage(this.users);
        this.applyFilter();
    }

    updateUser(user: User) {
        console.log(user, 'user');
        this.router.navigate(['Adduser'], { state: { user } });
    }


    deleteUser(userId: number) {
        this.users = this.users.filter(u => u.id !== userId);
        this.saveUsersToStorage(this.users);
        this.applyFilter();
    }

    applyFilter() {
        const filter = this.filterEmail.trim().toLowerCase(); // trim + lowercase once
        if (filter) {
            this.filteredUsers = this.users.filter(u => u.email.trim().toLowerCase().includes(filter) ||
                u.name.trim().toLowerCase().includes(filter) ||
                u.role.trim().toLowerCase().includes(filter) ||
                u.balnce?.toString().trim().toLowerCase().includes(filter)
            );
        } else {
            this.filteredUsers = [...this.users];
        }
    }


    private generateId(users: User[]): number {
        if (users.length === 0) return 1;
        return Math.max(...users.map(u => u.id)) + 1;
    }
}