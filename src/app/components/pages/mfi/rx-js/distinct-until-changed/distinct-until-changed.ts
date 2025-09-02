import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { fromEvent, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-distinct-until-changed',
  standalone: true,
  imports: [InputText, FormsModule],
  template: `
    <h1>Distinct Until Changed (input bilan)</h1>
    <input #searchBox type="text" pInputText [(ngModel)]="value" />

    <p>Current value: {{ value }}</p>
  `,
  styleUrl: './distinct-until-changed.css',
})
export class DistinctUntilChanged implements AfterViewInit {
  http = inject(HttpClient);
  value = '';

  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef;

  ngAfterViewInit() {
    fromEvent<InputEvent>(this.searchBox.nativeElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged((prev, curr) => {
          return prev === curr;
        }),
        switchMap((searchTerm) => {
          return this.fetchResults(searchTerm);
        }),
        tap((val) => console.log('Yangi qiymat:', val))
      )
      .subscribe();
  }
  fetchResults(q: string) {
    return this.http
      .get<string[]>(`https://api.example.com/search?q=${q}`)
      .pipe(
        catchError((err) => {
          return of(err);
        })
      );
  }
}