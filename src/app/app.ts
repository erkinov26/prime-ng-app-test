import { Component, inject, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { LoaderService } from './core/services/loader.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProgressBar],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  ls = inject(LoaderService);
  private router = inject(Router);
  protected title = 'prime-ng-app';
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.ls.show();
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.ls.hide();
      }
    });
  }
}
