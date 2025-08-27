import { Component } from '@angular/core';
import { ConnectableObservable, interval, multicast, Subject } from 'rxjs';

@Component({
  selector: 'app-second-example',
  imports: [],
  templateUrl: './second-example.html',
  styleUrl: './second-example.css',
})
export class SecondExample {
  // source = interval(500);
  // subject = new Subject();
  // multicasted = this.source.pipe(
  //   multicast(this.subject)
  // ) as ConnectableObservable<number>;
  // subscription1: any;
  // subscription2: any;
  // subscriptionConnect: any;
  // constructor() {
  //   this.subscription1 = this.multicasted.subscribe({
  //     next: (v) => console.log('observerA', v),
  //   });
  //   // this.multicasted.subscribe({
  //   //   next: (v) => console.log('observerB', v),
  //   // });
  //   this.subscriptionConnect = this.multicasted.connect();
  //   setTimeout(() => {
  //     this.subscription2 = this.multicasted.subscribe({
  //       next: (v) => console.log(v),
  //     });
  //   }, 600);
  //   setTimeout(() => {
  //     this.subscription1.unsubscribe();
  //   }, 1200);
  //   setTimeout(() => {
  //     this.subscription2.unsubscribe();
  //     this.subscriptionConnect.unsubscribe(); // for the shared Observable execution
  //   }, 2000);
  // }
}
