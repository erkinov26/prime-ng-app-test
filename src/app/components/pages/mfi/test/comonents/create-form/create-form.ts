import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBase } from '../../service/form-base';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { useLoading } from '../../service/use-loading';
import {
  CreateFormService,
  EUserData,
} from '../../service/create-form.service';
import { catchError, delay, EMPTY, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeFormValue } from '../../service/operators';
import { AsyncPipe, NgIf } from '@angular/common';

export interface UserPayload {
  [EUserData.EMAIL]: string;
  [EUserData.PASSWORD]: string;
}
export interface IUser {
  [EUserData.EMAIL]: string;
  [EUserData.PASSWORD]: string;
}

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputText, ButtonModule, AsyncPipe, NgIf],
  template: `
    <h1>Create Form</h1>
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <input
        pInputText
        pSize="small"
        type="email"
        [formControlName]="eud.EMAIL"
        placeholder="Email"
      />
      <input
        pInputText
        pSize="small"
        type="password"
        [formControlName]="eud.PASSWORD"
        placeholder="Password"
      />

      <button
        pButton
        severity="secondary"
        type="submit"
        [disabled]="loading$ | async"
      >
        <span *ngIf="loading$ | async">Loading...</span>
        <span *ngIf="!(loading$ | async)">Save</span>
      </button>
    </form>

    <!-- Error chiqishi uchun -->
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

    const [submitFn, submitFormLoading$, submitFormError$] = useLoading(
      (formValue: IUser) => {
        const params: UserPayload = { ...formValue };
        return this.createFormService.signin(params).pipe(delay(2000)); // ⏳ 2 sekund kutadi
      }
    );

    // ✅ Submit bosilganda
    this.submit$
      .pipe(
        tap((form) => {
          if (form.invalid) this.form.markAllAsTouched();
        }),
        filter((form) => form.valid),
        takeFormValue<IUser>(),
        switchMap(submitFn),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('✅ Success');
            console.log(response);
          }
        },
        error: (err) => {
          console.log('❌ Error occurs in subscribe:', err);
        },
      });
  }
}
