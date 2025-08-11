import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploader } from '../../../../shared/inputs/file-uploader/file-uploader';
interface TableColumn {
  key: string;
  name: string;
  type: 'number' | 'text' | 'date' | 'select' | 'file' | 'button';
  placeholder: string;

  options?: any[];
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
    DatePicker,
    FileUploadModule,
    FileUploader,
  ],
  templateUrl: './receipts.html',
})
export class Receipts {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  mainForm = this.fb.group({
    formItems: this.fb.array([]),
  });

  get formItemsArray(): FormArray {
    return this.mainForm.get('formItems') as FormArray;
  }

  ispolzovanieOptions = [
    { name: 'Option 1', code: '1' },
    { name: 'Option 2', code: '2' },
  ];

  currencyOptions = [
    { name: 'USD', code: 'USD' },
    { name: 'EUR', code: 'EUR' },
  ];

  deystvieOptions = [
    { name: 'Действие 1', code: 'act1' },
    { name: 'Действие 2', code: 'act2' },
  ];

  statusOptions = [
    { name: 'Активный', code: 'active' },
    { name: 'Неактивный', code: 'inactive' },
  ];

  table_data: TableColumn[] = [
    {
      key: 'post_amount',
      name: 'Сумма пост.',
      type: 'number',
      placeholder: '0.00',
    },
    {
      key: 'post_balance',
      name: 'Остатка пост.',
      type: 'number',
      placeholder: '0.00',
    },
    {
      key: 'tranche_amount',
      name: 'Сумма транша',
      type: 'number',
      placeholder: '0.00',
    },
    {
      key: 'usage',
      name: 'Использование',
      type: 'select',
      placeholder: '',

      options: this.ispolzovanieOptions,
    },
    {
      key: 'available',
      name: 'Доступно',
      type: 'number',
      placeholder: '',
    },
    {
      key: 'blocked_amount',
      name: 'Запр.сумма',
      type: 'number',
      placeholder: '0.00',
    },
    {
      key: 'value_date',
      name: 'Дата валют.',
      type: 'date',
      placeholder: '',
    },
    {
      key: 'view_amount',
      name: 'Вид.сумма',
      type: 'select',
      placeholder: '',

      options: this.currencyOptions,
    },
    {
      key: 'action',
      name: 'Действие',
      type: 'select',
      placeholder: '',

      options: this.deystvieOptions,
    },
    {
      key: 'file',
      name: 'Файл',
      type: 'file',
      placeholder: '',
    },
    {
      key: 'status',
      name: 'Статус',
      type: 'select',
      placeholder: '',

      options: this.statusOptions,
    },
    {
      key: 'actions',
      name: 'Действия',
      type: 'button',
      placeholder: '',
    },
  ];

  constructor() {
    this.addFormItem();
  }

  addFormItem() {
    const group: FormGroup = this.fb.group({});
    console.log('🚀 ~ Receipts ~ addFormItem ~ group:', group);
    this.table_data.forEach((col) => {
      if (col.type !== 'button') {
        group.addControl(col.key, this.fb.control(''));
      }
    });
    this.formItemsArray.push(group);
    console.log('🚀 ~ Receipts ~ addFormItem ~ group:', group);
    console.log(this.formItemsArray);
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
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  onSubmit() {
    console.log(this.mainForm.value);
  }
}
