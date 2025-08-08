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
  selector: 'app-commitment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInput,
    SelectInput,
    DatePicker,
    ButtonModule,
  ],
  templateUrl: './commitment.html',
  styleUrl: './commitment.css',
})
export class Commitment {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  commitment: FormGroup = this.fb.group({});

  input_fields: InputFieldsI[] = [
    {
      controlName: 'type',
      type: 'select',
      label: 'Тип',
      placeholder: 'Типни танланг',
      options: [{ name: 'Тип 1', code: 'type1' }],
      class: 'w-[30%]',
    },
    {
      controlName: 'status',
      type: 'select',
      label: 'Состояние',
      placeholder: 'Состояниени танланг',
      options: [{ name: 'Активный', code: 'active' }],
      class: 'w-[24%]',
    },
    {
      controlName: 'rate_type',
      type: 'select',
      label: 'Тип процентной ставки',
      placeholder: 'Ставкани танланг',
      options: [{ name: 'Фиксированный', code: 'fixed' }],
      class: 'w-[24%]',
    },
    {
      controlName: 'rate_date',
      type: 'date',
      label: 'Дата ставки',
      placeholder: 'Санани танланг',
      class: 'w-[20%]',
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
  ];

  constructor() {
    // this.buildForm(); // optional if needed
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.commitment.valid) {
      console.log('✅ Обязательство:', this.commitment.value);
    } else {
      console.log('❌ Форму заполните корректно.');
    }
  }

  update(data: any) {
    this.commitment.patchValue(data);
  }
}
