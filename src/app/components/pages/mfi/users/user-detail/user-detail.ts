import { JsonPipe } from '@angular/common';
import { httpResource, HttpResourceRequest } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-user-detail',
  imports: [
    ButtonDirective,
    RouterLink,
    // JsonPipe
  ],
  template: `
    <div class="flex justify-between items-center p-4">
      <button pButton routerLink="/mfi/users">Back</button>
      <h1>User detail</h1>
    </div>
    <div class="card border rounded-md w-[30vw] p-3 mt-4">
      <div>
        <!-- {{
          currentUser.isLoading()
            ? 'Loading...'
            : (currentUser.value().name | json)
        }} -->
        {{ currentUser.name }}
      </div>
    </div>
  `,
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  currentUser: any;

  constructor() {
    this.route.data.subscribe((data) => {
      console.log('resolverdan keldi:', data);
      const user = data['user'];
      this.currentUser = data['user'];
    });
  }
}
