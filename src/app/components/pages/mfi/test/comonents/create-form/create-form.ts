import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBase } from '../../service/form-base';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  CreateFormService,
  EUserData,
} from '../../service/create-form.service';
import { catchError, EMPTY, filter, finalize, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeFormValue } from '../../service/operators';
import { AsyncPipe, NgIf } from '@angular/common';
export interface IUser {
  [EUserData.EMAIL]: string;
  [EUserData.PASSWORD]: string;
}

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputText, ButtonModule, AsyncPipe, NgIf],
  template: `
    <h1>{{ 'CREATE_FORM' }}</h1>

    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <input
        pInputText
        pSize="small"
        type="email"
        [formControlName]="eud.EMAIL"
        [placeholder]="'EMAIL'"
      />
      <input
        pInputText
        pSize="small"
        type="password"
        [formControlName]="eud.PASSWORD"
        [placeholder]="'PASSWORD'"
      />

      <button
        pButton
        severity="secondary"
        type="submit"
        [disabled]="loading$ | async"
      >
        <span *ngIf="loading$ | async">{{ 'LOADING' }}</span>
        <span *ngIf="!(loading$ | async)">{{ 'SAVE' }}</span>
      </button>
    </form>

    <p *ngIf="error$ | async as err" class="text-red-500">
      {{ err?.message }}
    </p>
  `,
  styleUrls: ['./create-form.css'],
})
export class CreateForm extends FormBase {
  eud = EUserData;
  createFormService = inject(CreateFormService);
  destroyRef = inject(DestroyRef);
  constructor() {
    super();
    this.form = this.fb.group({
      [this.eud.EMAIL]: ['', [Validators.required]],
      [this.eud.PASSWORD]: ['', [Validators.required]],
    });

    this.submit$
      .pipe(
        tap((form) => {
          if (form.invalid) this.form.markAllAsTouched();
        }),
        filter((form) => form.valid),
        takeFormValue<IUser>(),

        tap(() => {
          this.setLoading(true);
        }),

        switchMap((payload) => {
          console.log('🚀 ~ CreateForm ~ constructor ~ payload:', payload);
          return this.createFormService.signin(payload).pipe(
            catchError((err) => {
              console.log('🚀 ~ CreateForm ~ constructor ~ err:', err);
              this.setError(err);
              return EMPTY;
            }),
            finalize(() => {
              this.setLoading(false);
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response: any) => {
          console.log('🚀 ~ CreateForm ~ constructor ~ response:', response);
          if (response?.success) {
            console.log(response);
          }
        },
      });
  }
}
