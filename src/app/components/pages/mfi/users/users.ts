import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { ButtonDirective } from 'primeng/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [ButtonDirective, RouterLink],
  template: `<h1>Users</h1>
    @if(!data){
    <h1>Loading...</h1>

    } @else{
    <ul class="flex flex-col gap-2">
      @for(u of data; track $index){
      <li
        [routerLink]="['/mfi/users', u.id]"
        class="border rounded-md p-2 flex justify-between items-center"
      >
        <b>{{ u.name }}</b>
        <button pButton size="small">Click Me</button>
      </li>
      }
    </ul>
    }`,
  styles: ` `,
})
export class Users implements OnInit {
  data: any[] | null = null;
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((val: any) => {
      this.data = val;
    });
  }
}
