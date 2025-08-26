import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {}
  http = inject(HttpClient);

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
  getOneUser(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
