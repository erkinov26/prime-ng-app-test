import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-request-resource',
  imports: [TextInput, ReactiveFormsModule, DatePicker, NgClass, ButtonModule],
  templateUrl: './request-resource.html',
  styleUrl: './request-resource.css',
})
export class RequestResource implements AfterViewInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  requestResource = this.fb.group({});

  input_fields: any[] = [
    {
      controlName: 'sbu_code',
      type: 'text',
      label: 'ЦБУ код',
    },
    {
      controlName: 'client_code',
      type: 'text',
      label: 'Код клиента',
    },
    {
      controlName: 'client_name',
      type: 'text',
      label: 'Наименование клиента',
    },
    {
      controlName: 'booking_date',
      type: 'date',
      label: 'Дата брони',
    },
    {
      controlName: 'booking_amount',
      type: 'number',
      label: 'Сумма брони',
    },
    {
      controlName: 'booking_balance',
      type: 'number',
      label: 'Остаток брони',
    },
    {
      controlName: 'transaction_start_date',
      type: 'date',
      label: 'Дата начало анкета транша',
    },
    {
      controlName: 'transaction_end_date',
      type: 'date',
      label: 'Дата окончания анкета транша',
    },
    {
      controlName: 'transaction_amount',
      type: 'text',
      label: 'Сумма анкета транша',
    },
  ];

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    console.log('Form submitted:', this.requestResource.value);
  }
}
