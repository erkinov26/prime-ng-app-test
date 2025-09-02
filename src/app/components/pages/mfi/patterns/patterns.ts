import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { ButtonDirective } from 'primeng/button';

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: 'my error message' };

export interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-patterns',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, ButtonDirective],
  template: `
    <button pButton (click)="refetch()">Refetch (parallel)</button>
    <button pButton (click)="nextUser()">Next User</button>
    <button pButton (click)="refetch()">Refetch</button>
    <h3>3. Parallel Fetch (user + posts)</h3>
  
    @if (parallelData$ | async; as data) { @if (data.status === 'loading') {
    <h1>Loading...</h1>
    } @else if (data.status === 'error') {
    <h1>Error occurs</h1>
    } @else {
    <pre>{{ data.data | json }}</pre>
    } }
  `,
})
export class Patterns {
  private http = inject(HttpClient);

  // --- umumiy subjectlar ---
  private counterSubject = new BehaviorSubject<number>(1);
  counter$ = this.counterSubject.asObservable();

  private reloadSubject = new Subject<void>();
  private refetchSubject = new Subject<void>();

  // --- umumiy handler ---
  private toAsyncStateHandler<T, R>(
    projection: (value: T) => Observable<R>,
    reloadTrigger?: Observable<void>
  ): (source: Observable<T>) => Observable<AsyncState<R>> {
    return (source: Observable<T>) =>
      reloadTrigger
        ? combineLatest([source, reloadTrigger.pipe(startWith(void 0))]).pipe(
            switchMap(([value]) =>
              projection(value).pipe(
                map((data) => ({ status: 'success' as const, data })),
                startWith({ status: 'loading' as const }),
                catchError(() =>
                  of({
                    status: 'error' as const,
                    message: 'my error message' as const,
                  })
                )
              )
            )
          )
        : source.pipe(
            switchMap((value) =>
              projection(value).pipe(
                map((data) => ({ status: 'success' as const, data })),
                startWith({ status: 'loading' as const }),
                catchError(() =>
                  of({
                    status: 'error' as const,
                    message: 'my error message' as const,
                  })
                )
              )
            )
          );
  }

  // --- 1. Oddiy fetch ---
  user$ = this.counter$.pipe(
    this.toAsyncStateHandler((id: number) =>
      this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
    )
  );

  // --- 2. Reload bilan fetch ---
  userWithReload$ = this.counter$.pipe(
    this.toAsyncStateHandler(
      (id: number) =>
        this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`),
      this.reloadSubject
    )
  );

  // --- 3. Parallel fetch (user + posts) ---
  parallelData$ = this.counter$.pipe(
    this.toAsyncStateHandler(
      (id: number) =>
        forkJoin({
          user: this.http.get<User>(
            `https://jsonplaceholder.typicode.com/users/${id}`
          ),
          posts: this.http.get<any[]>(
            `https://jsonplaceholder.typicode.com/users/${id}/posts`
          ),
        }),
      this.refetchSubject
    )
  );

  // --- UI funksiyalari ---
  nextUser() {
    const current = this.counterSubject.value;
    this.counterSubject.next(current + 1);
  }

  reload() {
    this.reloadSubject.next();
  }

  refetch() {
    this.refetchSubject.next();
  }
}
