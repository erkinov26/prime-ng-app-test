import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-user-detail',
  imports: [ButtonDirective, RouterLink],
  template: `
    <div class="flex justify-between items-center p-4">
      <button pButton routerLink="/mfi/users">Back</button>
      <h1>User detail</h1>
      <h1>{{ currentUser.name }}</h1>
    </div>
  `,
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  currentUser: any;

  constructor() {
    this.route.data.subscribe((data) => {
      console.log('resolverdan keldi:', data);
      this.currentUser = data['user'];
    });
  }
}
