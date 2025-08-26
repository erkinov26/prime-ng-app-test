import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Child } from './child/child';
import { HttpClient, httpResource } from '@angular/common/http';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [Child, ButtonDirective],
  template: `
    <h1>{{ parentData }}</h1>
    <app-child (dataEvent)="getData($event)" />
    <button pButton>Send Request</button>
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
}
