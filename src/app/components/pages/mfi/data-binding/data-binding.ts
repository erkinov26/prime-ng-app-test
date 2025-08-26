import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Child } from './child/child';
import { HttpClient } from '@angular/common/http';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [Child, ButtonDirective],
  template: `
    <h1>{{ parentData }}</h1>
    <app-child (dataEvent)="getData($event)" />
    <button pButton (click)="sendRequest()">Send Request</button>
  `,
  styleUrl: './data-binding.css',
})
export class DataBinding implements AfterContentInit {
  parentData: any = '';
  cdr = inject(ChangeDetectorRef);
  http = inject(HttpClient);

  getData($event: any) {
    this.parentData = $event;
  }

  ngAfterContentInit(): void {
    this.cdr.detectChanges();
  }

  sendRequest() {
    this.http
      .post(
        'http://localhost:3000/chat',
        { message: 'Hello AI 👋' },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe((res: any) => {
        console.log(res);
        this.parentData = res.reply;
      });
  }
}