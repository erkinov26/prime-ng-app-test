import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { TestService } from './service/test.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
export interface Post {
  userId: number;
  id: number;
  title: string;
}

export type HttpGetOptions = Parameters<HttpClient['get']>[1];
@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrls: ['./test.css'],
})
export class Test implements OnInit {
  ts = inject(TestService);
  private readonly destroyRef = inject(DestroyRef);
  constructor() {}
  getPosts(): Observable<Post[]> {
    return this.ts.getPosts().pipe(
      map((posts: Post[]) =>
        posts.map((p) => ({ ...p, title: p.title.toUpperCase() }))
      ),
      takeUntilDestroyed(this.destroyRef),
      tap({ complete: () => console.log('Unsubscribed!') })
    );
  }
  getTodos(): Observable<any[]> {
    return this.ts.getTodos().pipe(
      map((posts: Post[]) =>
        posts.map((p) => ({ ...p, title: p.title.toUpperCase() }))
      ),
      takeUntilDestroyed(this.destroyRef),
      tap({ complete: () => console.log('Unsubscribed!') })
    );
  }
  ngOnInit(): void {
    const opts: HttpGetOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: { id: 1, active: true },
      observe: 'body',
      responseType: 'json',
      withCredentials: true,
    };

    console.log(opts, 'HttpGetOptions example');
    this.getPosts().subscribe((data) => console.log(data, 'posts'));
    this.getTodos().subscribe((data) => console.log(data, 'todos'));
  }
}