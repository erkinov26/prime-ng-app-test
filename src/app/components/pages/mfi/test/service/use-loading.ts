import {
  BehaviorSubject,
  combineLatest,
  finalize,
  Observable,
  Subject,
} from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LoadingOptions } from '../../../../../core/use-loading';
export type FactoryFunction<T> = (...args: Array<any>) => Observable<T>;

export type ResultUseLoading<T> = [
  FactoryFunction<T>,
  Observable<boolean>,
  Observable<any>
];

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
              loading.next(false); // ✅ response tugagach loading false
            }
          })
        )
        .subscribe({
          next: (val) => {
            observer.next(val);
          },
          error: (err) => {
            error.next(err);
            observer.error(err);
          },
          complete: () => {
            observer.complete(); // ✅ finalize ishlashi uchun kerak
          },
        });
    });

  return [func, loading.asObservable(), error.asObservable()];
};
