import { Directive, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
@Directive()
export abstract class FormBase {
  protected fb = inject(FormBuilder);
  public form!: UntypedFormGroup;
  public submit$: Observable<UntypedFormGroup>;

  private submitSubject = new Subject<UntypedFormGroup>();

  public loading$!: Observable<boolean>;
  public error$!: Observable<any>;

  protected constructor() {
    this.submit$ = this.submitSubject.asObservable();
  }

  public submit(form: UntypedFormGroup): void {
    this.submitSubject.next(form);
  }
}