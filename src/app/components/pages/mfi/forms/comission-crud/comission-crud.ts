import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { ButtonModule } from 'primeng/button';
import { InputFieldsI } from '../../../../../core/interfaces/input_fields';

@Component({
  selector: 'app-comission-crud',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInput,
    SelectInput,
    DatePicker,
    ButtonModule,
  ],
  templateUrl: './comission-crud.html',
  styleUrl: './comission-crud.css',
})
export class ComissionCrud {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  comission_form: FormGroup;

  input_fields: InputFieldsI[] = [
    {
      controlName: 'commission_type',
      type: 'select',
      label: 'Тип комиссии',
      placeholder: 'Турини танланг',
      options: [{ name: 'Key', code: 'key' }],
      class: 'w-[30%]',
    },
    {
      controlName: 'type',
      type: 'select',
      label: 'Тип',
      placeholder: 'Типни танланг',
      options: [
        { name: 'A', code: 'a' },
        { name: 'B', code: 'b' },
      ],
      class: 'w-[20%]',
    },
    {
      controlName: 'rate',
      type: 'number',
      label: 'Ставка',
      placeholder: 'Ставкани киритинг',
      class: 'w-[6%]',
    },
    {
      controlName: 'payment_date',
      type: 'date',
      label: 'Дата оплаты',
      placeholder: 'Санани танланг',
      class: 'w-[24%]',
    },
    {
      controlName: 'start_date',
      type: 'date',
      label: 'Дата начало',
      placeholder: 'Санани танланг',
      class: 'w-[20%]',
    },
    {
      controlName: 'end_date',
      type: 'date',
      label: 'Дата окончания',
      placeholder: 'Санани танланг',
      class: 'w-[20%]',
    },
    {
      controlName: 'currency_rate',
      type: 'number',
      label: 'Курс валюты',
      placeholder: 'Курсни киритинг',
      class: 'w-[20%]',
    },
    {
      controlName: 'booking_date',
      type: 'date',
      label: 'Дата брони',
      placeholder: 'Санани танланг',
      class: 'w-[20%]',
    },
  ];

  constructor() {
    this.comission_form = this.buildForm();
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
    if (this.comission_form.valid) {
      console.log('✅ Комиссия маълумотлари:', this.comission_form.value);
    } else {
      console.log('❌ Формани тўлиқ тўлдиринг.');
    }
  }

  update(data: any) {
    this.comission_form.patchValue(data);
  }
}
