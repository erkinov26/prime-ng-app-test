import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  Router,
  withNavigationErrorHandler,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(HttpClient),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes
      // withNavigationErrorHandler((err: any) => {
      //   const router = inject(Router);
      //   if (err.message) {
      //     console.warn('navigation error occured', err);
      //     console.warn('navigation error occured', err.message);
      //   }
      // })
    ),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideAnimations(),
    MessageService,
  ],
};
