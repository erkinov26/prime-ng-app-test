import { Component } from '@angular/core';
import {
  from,
  multicast,
  Subject,
  Subscription,
  ConnectableObservable,
  connect,
  interval,
} from 'rxjs';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-rx-js',
  template: `
    <!-- EXAMPLE 1 -->
    <!-- <h1>{{ counter }}</h1>
    <button pButton severity="danger" (click)="onUnsubscribe()">
      Unsubscribe
    </button>
    <button pButton (click)="onSubscribe()">Subscribe</button>
    <button pButton severity="warn" (click)="onCounter()">Counter</button> -->

    <!-- EXAMPLE 2 -->

    <h1>Hello rx js</h1>
  `,
  styleUrls: ['./rx-js.css'],
  imports: [
    // ButtonDirective
  ],
  standalone: true,
})
export class RxJs {
  // EXAMPLE 1
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
  //  EXAMPLE 2

  source = interval(500);
  subject = new Subject();
  multicasted = this.source.pipe(
    multicast(this.subject)
  ) as ConnectableObservable<number>;
  subscription1: any;
  subscription2: any;
  subscriptionConnect: any;
  constructor() {
    this.subscription1 = this.multicasted.subscribe({
      next: (v) => console.log('observerA', v),
    });
    // this.multicasted.subscribe({
    //   next: (v) => console.log('observerB', v),
    // });
    this.subscriptionConnect = this.multicasted.connect();
    setTimeout(() => {
      this.subscription2 = this.multicasted.subscribe({
        next: (v) => console.log(v),
      });
    }, 600);
    setTimeout(() => {
      this.subscription1.unsubscribe();
    }, 1200);
    setTimeout(() => {
      this.subscription2.unsubscribe();
      this.subscriptionConnect.unsubscribe(); // for the shared Observable execution
    }, 2000);
  }
}
