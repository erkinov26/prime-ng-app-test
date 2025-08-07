import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { NgClass } from '@angular/common';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-commitment',
  imports: [
    ReactiveFormsModule,
    DatePicker,
    NgClass,
    SelectInput,
    ButtonModule,
  ],
  templateUrl: './commitment.html',
  styleUrl: './commitment.css',
})
export class Commitment {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  commitment = this.fb.group({});
  returnClass(i: number) {
    return {
      'w-[30%]': i < 3,
      'w-[24%]': i >= 3,
    };
  }
  input_fields = [
    {
      controlName: 'type',
      type: 'select',
      label: 'Тип',
    },
    {
      controlName: 'status',
      type: 'select',
      label: 'Состояние',
    },
    {
      controlName: 'rate_type',
      type: 'select',
      label: 'Тип процентной ставки',
    },
    {
      controlName: 'rate_date',
      type: 'date',
      label: 'Дата ставки',
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
  ];
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    console.log('Form submitted:', this.commitment.value);
  }
}
