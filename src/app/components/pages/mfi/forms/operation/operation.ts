import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-operation',
  imports: [ReactiveFormsModule, TextInput, DatePicker, SelectInput, NgClass],
  templateUrl: './operation.html',
  styleUrl: './operation.css',
})
export class Operation {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  operation = this.fb.group({});
  returnClass(i: number) {
    return {
      'w-[45%]': i === 1 || i === 2,
    };
  }
  input_fields = [
    {
      controlName: 'operation_type',
      type: 'select',
      label: 'Тип операции',
    },
    {
      controlName: 'document_type',
      type: 'select',
      label: 'Тип документа',
    },
    {
      controlName: 'document_number',
      type: 'text',
      label: 'Номер документа',
    },
    {
      controlName: 'debit_account',
      type: 'text',
      label: 'Дебет',
    },
    {
      controlName: 'debit_bank',
      type: 'text',
      disabled: true,
      label: 'Bosh bank', // Bosh bank (lekin label yo‘q)
    },
    {
      controlName: 'debit_inn',
      type: 'text',
      label: 'ИНН',
    },
    {
      controlName: 'credit_account',
      type: 'text',
      label: 'Кредит',
    },
    {
      controlName: 'credit_bank',
      type: 'text',
      disabled: true,
      label: 'Bosh bank', // Bosh bank (lekin label yo‘q)
    },
    {
      controlName: 'credit_inn',
      type: 'text',
      label: 'ИНН',
    },
    {
      controlName: 'amount',
      type: 'text',
      label: 'Сумма',
    },
    {
      controlName: 'amount_text',
      type: 'text',
      label: 'Сумма прописью',
    },
    {
      controlName: 'code',
      type: 'text',
      label: 'Код назначения',
    },
    {
      controlName: 'purpose',
      type: 'text',
      label: 'Назначение',
    },
  ];
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  onSubmit() {
    console.log(this.operation.value);
  }
}
