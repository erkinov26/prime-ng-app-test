import { Component, inject, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ButtonDirective, RouterLink],
  template: `
    <h1 class="mb-4 text-xl font-bold">Users</h1>

    <ul class="flex flex-col gap-2 mt-4">
      @for (u of data; track $index) {
      <li
        [routerLink]="['/mfi/users', u.id]"
        class="border rounded-md p-2 flex justify-between items-center hover:bg-gray-50 transition"
      >
        <b>{{ u.name }}</b>
        <button pButton size="small">Click Me</button>
      </li>
      }
    </ul>
  `,
  styles: [],
})
export class Users {
  data: any[] = [];
  route = inject(ActivatedRoute);

  constructor() {
    this.route.data.subscribe((data) => {
      console.log('resolverdan data keldi', data);
      this.data = data['users'];
    });
  }
}
