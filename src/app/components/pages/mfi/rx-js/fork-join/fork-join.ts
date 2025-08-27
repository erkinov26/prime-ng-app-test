import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { combineLatestAll, forkJoin, interval, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-fork-join',
  imports: [],
  templateUrl: './fork-join.html',
  styleUrl: './fork-join.css',
})
export class ForkJoin implements OnInit {
  http = inject(HttpClient);
  // stockPrices: number[] = [];
  // stock1$ = interval(1000).pipe(map(() => Math.random() * 100));
  // stock2$ = interval(1500).pipe(map(() => Math.random() * 200));
  // stock3$ = interval(2000).pipe(map(() => Math.random() * 300));

  // first = this.http.get(`https://jsonplaceholder.typicode.com/users/1`);
  // second = this.http.get(`https://jsonplaceholder.typicode.com/users/2`);
  // third = this.http.get(`https://jsonplaceholder.typicode.com/users/3`);
  ngOnInit(): void {
    // forkJoin({
    //   first: this.first,
    //   second: this.second,
    //   third: this.third,
    // }).subscribe((val) => {
    //   console.log(val);
    // });
    // const selectedStocks$ = of([this.stock1$, this.stock2$, this.stock3$]).pipe(
    //   tap(() => console.log('Selected stocks updated'))
    // );
    // selectedStocks$
    //   .pipe(
    //     combineLatestAll() // Combine the latest prices of all the stocks
    //   )
    //   .subscribe((prices) => {
    //     this.stockPrices = prices.map((price) => price.toFixed(2));
    //     console.log('Updated stock prices:', this.stockPrices);
    //   });
  }
}
