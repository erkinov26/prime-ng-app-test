import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';

interface TableColumn {
  key: string;
  name: string;
  type: 'number' | 'text' | 'date' | 'select' | 'file' | 'button';
  placeholder: string;
  step: string;
  min: string;
  accept: string;
  options: any[];
}

@Component({
  selector: 'app-receipts',
  standalone: true, // standalone ekanligini belgilash kerak
  imports: [
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    ReactiveFormsModule, // ✅ Reactive forms directivelar uchun
    FormsModule, // ✅ Agar ngModel ishlatsa
    TextInput,
    SelectInput,
  ],
  templateUrl: './receipts.html',
})
export class Receipts {
  private fb = inject(FormBuilder);

  mainForm = this.fb.group({
    formItems: this.fb.array([]),
  });

  get formItemsArray(): FormArray {
    return this.mainForm.get('formItems') as FormArray;
  }

  ispolzovanieOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
  ];

  deystvieOptions = [
    { label: 'Действие 1', value: 'act1' },
    { label: 'Действие 2', value: 'act2' },
  ];

  statusOptions = [
    { label: 'Активный', value: 'active' },
    { label: 'Неактивный', value: 'inactive' },
  ];

  table_data: TableColumn[] = [
    {
      key: 'post_amount',
      name: 'Сумма пост.',
      type: 'number',
      placeholder: '0.00',
      step: '0.01',
      min: '0',
      accept: '',
      options: [],
    },
    {
      key: 'post_balance',
      name: 'Остатка пост.',
      type: 'number',
      placeholder: '0.00',
      step: '0.01',
      min: '0',
      accept: '',
      options: [],
    },
    {
      key: 'tranche_amount',
      name: 'Сумма транша',
      type: 'number',
      placeholder: '0.00',
      step: '0.01',
      min: '0',
      accept: '',
      options: [],
    },
    {
      key: 'usage',
      name: 'Использование',
      type: 'select',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: this.ispolzovanieOptions,
    },
    {
      key: 'available',
      name: 'Доступно',
      type: 'number',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: [],
    },
    {
      key: 'blocked_amount',
      name: 'Запр.сумма',
      type: 'number',
      placeholder: '0.00',
      step: '0.01',
      min: '0',
      accept: '',
      options: [],
    },
    {
      key: 'value_date',
      name: 'Дата валют.',
      type: 'date',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: [],
    },
    {
      key: 'view_amount',
      name: 'Вид.сумма',
      type: 'select',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: this.currencyOptions,
    },
    {
      key: 'action',
      name: 'Действие',
      type: 'select',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: this.deystvieOptions,
    },
    {
      key: 'file',
      name: 'Файл',
      type: 'file',
      placeholder: '',
      step: '',
      min: '',
      accept: '.pdf,.doc,.docx,.jpg,.png',
      options: [],
    },
    {
      key: 'status',
      name: 'Статус',
      type: 'select',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: this.statusOptions,
    },
    {
      key: 'actions',
      name: 'Действия',
      type: 'button',
      placeholder: '',
      step: '',
      min: '',
      accept: '',
      options: [],
    },
  ];

  constructor() {
    this.addFormItem();
  }

  addFormItem() {
    const group: FormGroup = this.fb.group({});
    this.table_data.forEach((col) => {
      if (col.type !== 'button') {
        group.addControl(col.key, this.fb.control(''));
      }
    });
    this.formItemsArray.push(group);
  }

  removeFormItem(index: number) {
    this.formItemsArray.removeAt(index);
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      this.formItemsArray.at(index).get('file')?.setValue(file);
    }
  }
  onSubmit() {
    console.log(this.mainForm.value);
  }
}
