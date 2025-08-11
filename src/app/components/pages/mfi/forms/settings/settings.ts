import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { InputFieldsI } from '../../../../../core/interfaces/input_fields';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { CheckboxModule } from 'primeng/checkbox';
import { Checkbox } from '../../../../shared/inputs/checkbox/checkbox';

@Component({
  selector: 'app-settings',
  imports: [
    ReactiveFormsModule,
    TextInput,
    SelectInput,
    DatePicker,
    CheckboxModule,
    Checkbox,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  settings: FormGroup = this.fb.group({});
  input_fields: InputFieldsI[] = [
    {
      controlName: 'tax_source',
      type: 'select',
      label: 'Источник налогообложения',
      placeholder: 'Выберите источник налогообложения',
      class: 'w-[48%] flex gap-2 items-center [&>*:nth-child(1)]:w-[45%]',
    },
    {
      controlName: 'tax_percent',
      type: 'text',
      label: 'Процент налога',
      placeholder: 'Введите процент налога',
      class: 'w-[48%] flex [&>*:nth-child(1)]:w-[38%] gap-2 items-center',
    },
    {
      controlName: 'has_tax_benefit',
      type: 'checkbox',
      label: 'Имеет налоговую льготу',
      placeholder: '',
      class: 'w-[20%] items-center flex gap-2',
    },
    {
      controlName: 'benefit_percent',
      type: 'text',
      label: 'Процент',
      placeholder: 'Введите процент льготы',
      class: 'w-[24%] flex items-center gap-2',
    },
    {
      controlName: 'law_source',
      type: 'select',
      label: 'Источник законодательство',
      placeholder: 'Выберите источник законодательства',
      class: 'w-[48%] flex [&>*:first-child]:w-[45%] items-center',
    },
    {
      controlName: 'benefit_amount',
      type: 'text',
      label: 'Сумма льготы',
      placeholder: 'Введите сумму льготы',
      class: 'w-[24%] flex items-center [&>*:first-child]:w-[80%]',
    },
    {
      controlName: 'currency_code',
      type: 'text',
      label: 'Код валюты',
      placeholder: 'Введите код валюты',
      class: 'w-[24%]  flex items-center [&>*:nth-child(2)]:w-[55%] gap-2',
    },
    {
      controlName: 'benefit_period_start',
      type: 'date',
      label: 'Льготный период',
      placeholder: '25.05.2005',
      class: 'w-[30%] flex [&>*:nth-child(2)]:w-[56%] items-center gap-2',
    },
    {
      controlName: 'benefit_period_end',
      type: 'date',
      label: ' ',
      placeholder: '25.05.2025',
      class: 'w-[16%] flex items-center',
    },
  ];
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  onSubmit() {
    console.log(this.settings.value);
  }
}
