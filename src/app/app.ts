import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ProgressBar } from 'primeng/progressbar';
import { LoaderService } from './core/services/loader.service';
import { ToastModule } from 'primeng/toast';
import { filter, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressBar, ToastModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
// implements OnInit
export class App {
  ls = inject(LoaderService);
  private router = inject(Router);
  protected title = 'prime-ng-app';

  protected readonly isRouterLazyLoading = this.router.events.pipe(
    filter(
      (event) =>
        event instanceof RouteConfigLoadStart ||
        event instanceof RouteConfigLoadEnd
    ),
    map((event) => event instanceof RouteConfigLoadStart),
    startWith(false)
  );
}
