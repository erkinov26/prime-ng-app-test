import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';
import { ButtonModule } from 'primeng/button';
import { InputFieldsI } from '../../../../../core/interfaces/input_fields';

@Component({
  selector: 'app-request-resource',
  standalone: true,
  imports: [ReactiveFormsModule, TextInput, DatePicker, ButtonModule],
  templateUrl: './request-resource.html',
  styleUrl: './request-resource.css',
})
export class RequestResource implements AfterViewInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  requestResource: FormGroup = this.fb.group({});

  input_fields: InputFieldsI[] = [
    {
      controlName: 'sbu_code',
      type: 'text',
      label: 'ЦБУ код',
      placeholder: 'ЦБУ кодни киритинг',
      class: 'w-[18%] flex flex-col gap-2',
    },
    {
      controlName: 'client_code',
      type: 'text',
      label: 'Код клиента',
      placeholder: 'Клиент кодини киритинг',
      class: 'w-[18%] flex flex-col gap-2',
    },
    {
      controlName: 'client_name',
      type: 'text',
      label: 'Наименование клиента',
      placeholder: 'Клиент номини киритинг',
      class: 'w-[18%] flex flex-col gap-2',
    },
    {
      controlName: 'booking_date',
      type: 'date',
      label: 'Дата брони',
      placeholder: 'Бронь санасини танланг',
      class: 'w-[18%]  flex flex-col gap-2',
    },
    {
      controlName: 'booking_amount',
      type: 'number',
      label: 'Сумма брони',
      placeholder: 'Бронь суммасини киритинг',
      class: 'w-[18%] flex flex-col gap-2',
    },
    {
      controlName: 'booking_balance',
      type: 'number',
      label: 'Остаток брони',
      placeholder: 'Бронь қолдиғини киритинг',
      class: 'w-[22.5%] flex flex-col gap-2',
    },
    {
      controlName: 'transaction_start_date',
      type: 'date',
      label: 'Дата начало анкета транша',
      placeholder: 'Анкета транша бошланиш санаси',
      class: 'w-[22.5%] flex flex-col gap-2',
    },
    {
      controlName: 'transaction_end_date',
      type: 'date',
      label: 'Дата окончания анкета транша',
      placeholder: 'Анкета транша тугаш санаси',
      class: 'w-[22.5%] flex flex-col gap-2',
    },
    {
      controlName: 'transaction_amount',
      type: 'text',
      label: 'Сумма анкета транша',
      placeholder: 'Анкета транша суммасини киритинг',
      class: 'w-[22.5%] flex flex-col gap-2',
    },
  ];

  constructor() {
    // this.requestResource = this.buildForm();
  }

  // buildForm(): FormGroup {
  //   const group: { [key: string]: any } = {};
  //   this.input_fields.forEach((field) => {
  //     group[field.controlName] = [
  //       { value: '', disabled: field.disabled || false },
  //       Validators.nullValidator,
  //     ];
  //   });
  //   return this.fb.group(group);
  // }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.requestResource.valid) {
      console.log('✅ Ресурс запрос:', this.requestResource.value);
    } else {
      console.log('❌ Формани тўлиқ тўлдиринг.');
    }
  }

  onDelete() {
    console.log('🗑️ Forma o‘chirildi:', this.requestResource.value);
    this.requestResource.reset(); // formani tozalash
  }
}
