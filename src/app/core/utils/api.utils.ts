import { HttpClient } from '@angular/common/http';

export type HttpGetOptions = Parameters<HttpClient['get']>[1];
export type HttpPostOptions = Parameters<HttpClient['post']>[2];

export function getApiRequestOptions(options?: HttpGetOptions): HttpGetOptions;
export function getApiRequestOptions(
  options?: HttpPostOptions
): HttpPostOptions;

export function getApiRequestOptions(
  options?: HttpGetOptions | HttpPostOptions
): HttpGetOptions | HttpPostOptions {
  return {
    ...options,
    headers: {
      ...(options?.headers || {}),
      'Content-Type': 'application/json',
    },
    withCredentials: options?.withCredentials ?? true,
  };
}
