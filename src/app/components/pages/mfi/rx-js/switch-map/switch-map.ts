import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Subject, switchMap } from 'rxjs';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-switch-map',
  imports: [ButtonDirective],
  template: `
    <button pButton severity="warn" (click)="switchMapFunc()">
      Click Me to Switch
    </button>
  `,
  styleUrl: './switch-map.css',
})
export class SwitchMap {
  http = inject(HttpClient);
  private searchClick$ = new Subject<void>();
  constructor() {
    this.searchClick$.pipe(switchMap(() => this.search())).subscribe((data) => {
      console.log(data);
    });
  }
  search() {
    return this.http.get<string[]>(
      `https://jsonplaceholder.typicode.com/users`
    );
  }
  switchMapFunc() {
    this.searchClick$.next();
  }
}
