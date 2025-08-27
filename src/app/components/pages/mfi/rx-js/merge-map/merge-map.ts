import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { merge, take, tap } from 'rxjs';

@Component({
  selector: 'app-merge-map',
  imports: [],
  template: ` <h1>This is merge map</h1>`,
  styleUrl: './merge-map.css',
})
export class MergeMap {
  // http = inject(HttpClient);
  // first = this.http.get(`https://jsonplaceholder.typicode.com/users/1`);
  // second = this.http.get(`https://jsonplaceholder.typicode.com/users/2`);
  // third = this.http.get(`https://jsonplaceholder.typicode.com/users/3`);
  // constructor() {
  //   merge(this.first, this.second, this.third)
  //     .pipe(
  //       take(3),
  //       tap(() => {
  //         console.log('tap works');
  //       })
  //     )
  //     .subscribe((val) => console.log(val));
  // }
}
