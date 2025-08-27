import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  httpResource,
  HttpResourceRequest,
} from '@angular/common/http';

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
  
  // WITH HTTP RESOURCE
  // getOneUserByHttpResource(id: number) {
  //   const user = httpResource<any>(
  //     () =>
  //       ({
  //         url: `https://jsonplaceholder.typicode.com/users/${id}`,
  //         method: 'GET',
  //       } as HttpResourceRequest)
  //   );

  //   return user;
  // }
}
