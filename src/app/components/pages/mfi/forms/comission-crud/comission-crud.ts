import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { NgClass } from '@angular/common';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { ButtonModule } from 'primeng/button';

interface CommissionFormData {
  commission_type: string;
  type: string;
  rate: number;
  payment_date: Date;
  start_date: Date;
  end_date: Date;
  currency_rate: number;
  booking_date: Date;
}

@Component({
  selector: 'app-comission-crud',
  imports: [
    ReactiveFormsModule,
    TextInput,
    DatePicker,
    NgClass,
    SelectInput,
    ButtonModule,
  ],
  templateUrl: './comission-crud.html',
  styleUrl: './comission-crud.css',
})
export class ComissionCrud implements AfterViewInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  comission_form = this.fb.group({});
  returnClass(i: number) {
    return {
      'w-[35%]': i === 0 || i === 3,
      'w-[20%]': i === 1,
      'w-[6%]': i === 2,
      'w-[24%]': i >= 4,
    };
  }
  input_fields: any = [
    {
      controlName: 'commission_type',
      type: 'select',
      label: 'Тип комиссии',
    },
    {
      controlName: 'type',
      type: 'select',
      label: 'Тип',
    },
    {
      controlName: 'rate',
      type: 'number',
      label: 'Ставка',
    },
    {
      controlName: 'payment_date',
      type: 'date',
      label: 'Дата оплаты',
    },
    {
      controlName: 'start_date',
      type: 'date',
      label: 'Дата начало',
    },
    {
      controlName: 'end_date',
      type: 'date',
      label: 'Дата окончания',
    },
    {
      controlName: 'currency_rate',
      type: 'number',
      label: 'Курс валюты',
    },
    {
      controlName: 'booking_date',
      type: 'date',
      label: 'Дата брони',
    },
  ];

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    console.log(this.comission_form.value);
  }
  update(data: CommissionFormData) {
    this.comission_form.patchValue(data);
  }
}
