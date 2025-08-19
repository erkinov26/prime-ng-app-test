import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  getApiRequestOptions,
  HttpGetOptions,
  HttpPostOptions,
} from '../utils/api.utils';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({ providedIn: 'root' })
export class CoreApiService {
  private readonly http = inject(HttpClient);
  private readonly envService = inject(EnvironmentService);

  constructor() {}

  private makeUrl(url: string): string {
    // Agar url http bilan boshlanmasa, appHostni qo‘shib yuboramiz
    return url.indexOf('http') === 0
      ? url
      : `${this.envService.getEnvironments().appHost}${url}`;
  }

  public get<T = void>(url: string, options?: HttpGetOptions): Observable<T> {
    return this.http.get<T>(this.makeUrl(url), getApiRequestOptions(options));
  }

  public post<T = void>(
    url: string,
    body: unknown | null,
    options?: HttpPostOptions
  ): Observable<T> {
    return this.http.post<T>(
      this.makeUrl(url),
      body,
      getApiRequestOptions(options)
    );
  }

  public put<T = void>(
    url: string,
    body: unknown | null,
    options?: HttpPostOptions
  ): Observable<T> {
    return this.http.put<T>(
      this.makeUrl(url),
      body,
      getApiRequestOptions(options)
    );
  }

  public delete<T = void>(
    url: string,
    options?: HttpGetOptions
  ): Observable<T> {
    return this.http.delete<T>(
      this.makeUrl(url),
      getApiRequestOptions(options)
    );
  }
}
