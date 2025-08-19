import { inject, Injectable } from '@angular/core';
import { CoreApiService } from './core-api.service';
import { EnvironmentService } from './environment.service';
import { HttpGetOptions, HttpPostOptions } from '../utils/api.utils';
import { Observable } from 'rxjs';

type GenericParamItem = Record<
  string,
  string | number | Array<number> | boolean | object | null | undefined
>;

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly coreApiService = inject(CoreApiService);

  public get<T = void>(url: string, options?: HttpGetOptions): Observable<T> {
    return this.coreApiService.get<T>(url, options);
  }

  public post<T = void>(
    url: string,
    body: unknown,
    options?: HttpPostOptions
  ): Observable<T> {
    return this.coreApiService.post<T>(url, body, options);
  }

  public put<T = void>(
    url: string,
    body: unknown,
    options?: HttpPostOptions
  ): Observable<T> {
    return this.coreApiService.put<T>(url, body, options);
  }

  public delete<T = void>(
    url: string,
    options?: HttpGetOptions
  ): Observable<T> {
    return this.coreApiService.delete<T>(url, options);
  }

  // PLSQL metodlari
  public selectView<T = void>(
    body: { view: string; wh?: string },
    options?: HttpPostOptions
  ) {
    return this.post<T>('/execSelect', body, options);
  }

  public insertData<T = void>(
    body: GenericParamItem,
    options?: HttpPostOptions
  ) {
    return this.post<T>('/execInsert', body, options);
  }

  public updateData<T = void>(
    body: GenericParamItem,
    options?: HttpPostOptions
  ) {
    return this.post<T>('/execUpdate', body, options);
  }

  public deleteData<T = void>(
    body: GenericParamItem,
    options?: HttpPostOptions
  ) {
    return this.post<T>('/execDelete', body, options);
  }
}

// memory managmentniyam
// profiller