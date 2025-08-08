import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { InputFieldsI } from '../../../../../core/interfaces/input_fields';

@Component({
  selector: 'app-operation',
  standalone: true,
  imports: [ReactiveFormsModule, TextInput, SelectInput],
  templateUrl: './operation.html',
  styleUrl: './operation.css',
})
export class Operation {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  operation: FormGroup;

  input_fields: InputFieldsI[] = [
    {
      controlName: 'operation_type',
      type: 'select',
      label: 'Тип операции',
      placeholder: 'Операция турини танланг',
      options: [
        { name: 'Оплата', code: 'payment' },
        { name: 'Перевод', code: 'transfer' },
      ],
      class: ' w-[35%] mx-auto gap-2 flex flex-col',
    },
    {
      controlName: 'document_type',
      type: 'select',
      label: 'Тип документа',
      placeholder: 'Хужжат турини танланг',
      options: [
        { name: 'Счет-фактура', code: 'invoice' },
        { name: 'Акт', code: 'act' },
      ],
      class: ' w-[40%] flex-col',
    },
    {
      controlName: 'document_number',
      type: 'text',
      label: 'Номер документа',
      placeholder: 'Хужжат рақамини киритинг',
      class: ' w-[40%] flex-col',
    },
    {
      controlName: 'debit_account',
      type: 'text',
      label: 'Дебет',
      placeholder: 'Дебет ҳисоб рақамини киритинг',
      class: ' w-[34%]',
    },
    {
      controlName: 'debit_bank',
      type: 'text',
      label: '',
      placeholder: 'Bosh Bank',
      disabled: true,
      class: ' w-[12%]',
    },
    {
      controlName: 'debit_inn',
      type: 'text',
      label: 'ИНН',
      placeholder: 'ИННни киритинг',
      class: ' w-[34%]',
    },
    {
      controlName: 'credit_account',
      type: 'text',
      label: 'Кредит',
      placeholder: 'Кредит ҳисоб рақамини киритинг',
      class: ' w-[34%]',
    },
    {
      controlName: 'credit_bank',
      type: 'text',
      label: '',
      placeholder: 'Bosh Bank',
      disabled: true,
      class: ' w-[12%]',
    },
    {
      controlName: 'credit_inn',
      type: 'text',
      label: 'ИНН',
      placeholder: 'ИННни киритинг',
      class: ' w-[34%]',
    },
    {
      controlName: 'amount',
      type: 'text',
      label: 'Сумма',
      placeholder: 'Суммани киритинг',
      class: ' w-[40%] flex-col',
    },
    {
      controlName: 'amount_text',
      type: 'text',
      label: 'Сумма прописью',
      placeholder: 'Суммани ёзма шаклда киритинг',
      class: ' w-[40%] flex-col',
    },
    {
      controlName: 'code',
      type: 'text',
      label: 'Код назначения',
      placeholder: 'Назначение кодини киритинг',
      class: 'w-[20%] items-center [&>*:first-child]:w-[60%]',
    },
    {
      controlName: 'debt_repayment',
      type: 'text',
      label: '',
      placeholder: 'Погашение долга',
      disabled: true,
      class: 'w-[20%]',
    },
    {
      controlName: 'purpose',
      type: 'text',
      label: 'Назначение',
      placeholder: 'Назначениени киритинг',
      class: 'w-[40%] items-center',
    },
  ];

  constructor() {
    this.operation = this.buildForm();
  }

  buildForm(): FormGroup {
    const group: { [key: string]: any } = {};
    this.input_fields.forEach((field) => {
      group[field.controlName] = [
        { value: '', disabled: field.disabled || false },
        Validators.nullValidator,
      ];
    });
    return this.fb.group(group);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.operation.valid) {
      console.log('✅ Form maʼlumotlari:', this.operation.value);
    } else {
      console.log('❌ Forma to‘liq to‘ldirilmagan.');
    }
  }
}
