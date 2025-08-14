import {
  BehaviorSubject,
  combineLatest,
  finalize,
  Observable,
  Subject,
} from 'rxjs';
import { map, take } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FactoryFunction<T> = (...args: Array<any>) => Observable<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResultUseLoading<T> = [
  FactoryFunction<T>,
  Observable<boolean>,
  Observable<any>
];

export interface LoadingOptions {
  error?: boolean;
  errorSubject?: Subject<Error | null>;
  loadSubject?: BehaviorSubject<boolean>;
  startWith?: boolean;
}

/**
 * Executes a task with loading progress tracking
 *
 * @template T The type of value returned by the source observable
 * @param source A factory function that returns an Observable
 * @param [opts] Configuration options
 * @param [opts.error] Whether to propagate errors to the observer
 * @param [opts.errorSubject] Custom subject for error handling
 * @param [opts.loadSubject] Custom subject for loading state
 * @param [opts.startWith] Initial loading state
 * @returns A tuple containing:
 *  - Factory function that wraps the source observable
 *  - Loading state observable
 *  - Error state observable
 */
export const useLoading = <T>(
  source: FactoryFunction<T>,
  opts: LoadingOptions = {}
): ResultUseLoading<T> => {
  const loading = opts.loadSubject
    ? opts.loadSubject
    : new BehaviorSubject<boolean>(Boolean(opts.startWith));
  const error = opts.errorSubject
    ? opts.errorSubject
    : new Subject<Error | null>();
  let subscribersCount = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const func = (...args: Array<any>): Observable<T> =>
    new Observable<T>((observer) => {
      loading.next(true);
      error.next(null);
      subscribersCount++;

      source(...args)
        .pipe(
          take(1),
          finalize(() => {
            subscribersCount--;

            if (subscribersCount < 1) {
              loading.next(false);
            }
          })
        )
        .subscribe({
          next: (val) => observer.next(val),
          error: (err) => {
            if (opts.error) {
              observer.error(err);
            }
            error.next(err);
          },
          complete: () => observer.complete(),
        });
    });

  return [func, loading, error];
};

export const mergeLoadings = (
  ...streams: Array<Observable<boolean>>
): Observable<boolean> =>
  combineLatest(streams).pipe(map((values) => values.includes(true)));

export const notLoading = (loading: Observable<boolean>): Observable<boolean> =>
  loading.pipe(map((value) => !value));
