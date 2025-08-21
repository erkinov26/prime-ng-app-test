import { Directive, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Directive()
export abstract class FormBase {
  protected fb = inject(FormBuilder);
  public form!: UntypedFormGroup;
  public submit$: Observable<UntypedFormGroup>;

  private submitSubject = new Subject<UntypedFormGroup>();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<any>(null);

  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  protected constructor() {
    this.submit$ = this.submitSubject.asObservable();
  }

  public submit(form: UntypedFormGroup): void {
    this.submitSubject.next(form);
  }

  protected setLoading(val: boolean) {
    this.loadingSubject.next(val);
  }

  protected setError(err: any) {
    this.errorSubject.next(err);
  }
}
