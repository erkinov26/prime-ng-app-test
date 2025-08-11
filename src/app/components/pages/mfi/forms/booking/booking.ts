import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { InputFieldsI } from '../../../../../core/interfaces/input_fields';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from '../../../../shared/inputs/text-input/text-input';
import { SelectInput } from '../../../../shared/inputs/select-input/select-input';
import { DatePicker } from '../../../../shared/inputs/date-picker/date-picker';

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule, TextInput, SelectInput, DatePicker],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements AfterViewInit {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  booking: FormGroup = this.fb.group({});
  input_fields: InputFieldsI[] = [
    {
      controlName: 'credit_line',
      type: 'text',
      label: 'Кредит линии',
      placeholder: 'Кредит линиясини киритинг',
      class: 'w-[15%] gap-2 flex flex-col',
    },
    {
      controlName: 'transh',
      type: 'text',
      label: 'Транш',
      placeholder: 'Траншни киритинг',
      class: 'w-[15%] gap-2 flex flex-col',
    },
    {
      controlName: 'client_name',
      type: 'text',
      label: 'Наименования клиента',
      placeholder: 'Клиент номини киритинг',
      class: 'w-[15%] gap-2 flex flex-col',
    },
    {
      controlName: 'rate_type',
      type: 'text',
      label: 'Тип ставка',
      placeholder: 'Ставка турини киритинг',
      class: 'w-[15%] gap-2 flex flex-col',
    },
    {
      controlName: 'rate',
      type: 'text',
      label: 'Ставка',
      placeholder: 'Ставкани киритинг',
      class: 'w-[15%] gap-2 flex flex-col',
    },
    {
      controlName: 'go_percent',
      type: 'text',
      label: 'Ставка ГО%',
      placeholder: 'ГО% ставкасини киритинг',
      class: 'w-[15%] gap-2 flex flex-col',
    },
    {
      controlName: 'id_form_transh',
      type: 'text',
      label: '№ ID анкета транш',
      placeholder: 'ID анкета траншни киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'id_transh',
      type: 'text',
      label: '№ ID транша',
      placeholder: 'ID траншни киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'transh_date',
      type: 'text',
      label: 'Дата транша',
      placeholder: 'Транш санасини киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'amount',
      type: 'text',
      label: 'Сумма',
      placeholder: 'Суммани киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'calendar_type',
      type: 'text',
      label: 'Тип календарь',
      placeholder: 'Календарь турини киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'interest_repayment_from',
      type: 'text',
      label: 'Гашение процентов с',
      placeholder: 'Фоиз тўлов бошланишини киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'debt_repayment_from',
      type: 'text',
      label: 'Гашение долга с',
      placeholder: 'Асосий қарз тўлов бошланишини киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'start_date',
      type: 'text',
      label: 'Дата начало',
      placeholder: 'Бошланиш санасини киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'end_date',
      type: 'text',
      label: 'Дата окончания',
      placeholder: 'Тугаш санасини киритинг',
      class: 'w-[18%] gap-2 flex flex-col',
    },
    {
      controlName: 'overdue_calculation',
      type: 'text',
      label: 'Расчет просрочка',
      placeholder: 'Просрочкани ҳисоблаш',
      class: 'w-[18%] gap-2 flex flex-col',
    },
  ];
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.booking.valid) {
      console.log('✅ Form maʼlumotlari:', this.booking.value);
    } else {
      console.log('❌ Forma to‘liq to‘ldirilmagan.');
    }
  }
}
