import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-first-example',
  imports: [
    // ButtonDirective
  ],
  template: `
    <h1>First Example</h1>
    <!-- <h1>{{ counter }}</h1>
    <button pButton severity="danger" (click)="onUnsubscribe()">
      Unsubscribe
    </button>
    <button pButton (click)="onSubscribe()">Subscribe</button>
    <button pButton severity="warn" (click)="onCounter()">Counter</button> -->
  `,
  styleUrl: './first-example.css',
})
export class FirstExample {
  // private subject = new Subject<number>();
  // observable$ = this.subject.asObservable();
  // counter = 1;
  // subscription!: Subscription;
  // setIntervalId: any;
  // constructor() {
  //   this.startInterval();
  //   this.subscription = this.observable$.subscribe((value) => {
  //     console.log('Olingan qiymat:', value);
  //   });
  // }
  // private startInterval() {
  //   if (!this.setIntervalId) {
  //     this.setIntervalId = setInterval(() => {
  //       this.counter++;
  //       this.subject.next(this.counter);
  //     }, 1000);
  //     console.log('Interval started');
  //   }
  // }
  // onUnsubscribe() {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  //   if (this.setIntervalId) {
  //     clearInterval(this.setIntervalId);
  //     this.setIntervalId = null;
  //   }
  //   console.log('Unsubscribed and interval cleared!');
  // }
  // onSubscribe() {
  //   this.subscription = this.observable$.subscribe((value) => {
  //     console.log('New returned value:', value);
  //   });
  //   console.log('Subscribed again!');
  // }
  // onCounter() {
  //   this.counter++;
  //   this.subject.next(this.counter);
  // }
}
