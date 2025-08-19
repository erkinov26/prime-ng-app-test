import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { FormComponent } from '../../../../../core/form';

import { SelectButtonModule } from 'primeng/selectbutton';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
 

export interface CreditBlankForm {
  branch: FormControl<string>;
  unique_type: FormControl<string>;
  unique_id: FormControl<string>;
  note: FormControl<string>;
  is_reser_wout_tranche: FormControl<boolean>;
  loan_terms: FormGroup<{
    project_initiator: FormControl<string>;
    unique_type: FormControl<string>;
    import_contract_subject: FormControl<string>;
    supplier: FormArray<FormGroup<{ value: FormControl<string> }>>;
    number: FormControl<string>;
    contract_date: FormControl<Date | null>;
    bank_credit_amount: FormGroup<{
      value: FormControl<string>;
      currency: FormControl<string>;
    }>;
    credit_info: FormArray<
      FormGroup<{
        payment_terms: FormControl<string>;
        amount: FormControl<string>;
        currency: FormControl<string>;
      }>
    >;
    lt_line: FormControl<File | null>;
    // lt_tranche: FormControl<File | null>;
  }>;
  funding_source: FormArray<
    FormGroup<{
      loan_term: FormControl<Date | null>;
      grace_period: FormControl<Date | null>;
    }>
  >;
  financing_terms: FormGroup<{
    loan_term: FormControl<Date | null>;
    grace_period: FormControl<Date | null>;
    tranche_term: FormControl<Date | null>;
    creditLineAmount: FormGroup<{
      value: FormControl<string>;
      currency: FormControl<string>;
    }>;
    total_interest_rate: FormControl<string>;
    foreign_bank_margin: FormControl<string>;
    floating_rate: FormGroup<{
      value: FormControl<string>;
      type: FormControl<string>;
    }>;
    tax_rate: FormGroup<{
      value: FormControl<string>;
      type: FormControl<string>;
    }>;
    repayment_freq: FormControl<string>;
    freq: FormControl<string>;
    comission_type: FormGroup<{
      value: FormControl<string>;
      type: FormControl<string>;
    }>;
  }>;
  early_repayment_condition: FormGroup<{
    first_area: FormControl<string>;
    second_area: FormControl<string>;
  }>;
}

export interface CreditBlankPayload {
  branch: string;
  unique_id: string;
  is_reser_wout_tranche: boolean;
  loan_terms: {
    project_initiator: string;
    import_contract_subject: string;
    supplier: { value: string }[];
    number: string;
    contract_date: string;
    bank_credit_amount: { value: string; currency: string };
    credit_info: { payment_terms: string; amount: string; currency: string }[];
    lt_line: string | null;
  };
  funding_source: { loan_term: string; grace_period: string }[];
  financing_terms: {
    loan_term: string;
    grace_period: string;
    tranche_term: string;
    creditLineAmount: { value: string; currency: string };
    total_interest_rate: string;
    foreign_bank_margin: string;
    floating_rate: { value: string; type: string };
    tax_rate: { value: string; type: string };
    repayment_freq: string;
    freq: string;
    comission_type: { value: string; type: string };
  };
}

@Component({
  selector: 'app-convenant-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FloatLabel,
    Select,
    InputTextModule,
    DatePicker,
    Checkbox,
    SelectButtonModule,
    IconField,
    InputIcon,
    TextareaModule,
  ],
  templateUrl: './convenant-form.html',
  styleUrl: './convenant-form.css',
})
export class ConvenantForm extends FormComponent {
  textarea_value: string = `Срок данной одобренной заявки действителен до 11.09.2025 ...`;
  stateOptions = [
    { label: 'Кредитный анкета', value: 'credit_blank_id' },
    { label: 'Уникальный код', value: 'unique_code' },
  ];

  mapFormToPayload(formValue: any): CreditBlankPayload {
    return {
      branch: formValue.branch,
      unique_id: formValue.unique_id,
      is_reser_wout_tranche: formValue.is_reser_wout_tranche,
      loan_terms: {
        project_initiator: formValue.loan_terms.project_initiator,
        import_contract_subject: formValue.loan_terms.import_contract_subject,
        supplier: formValue.loan_terms.supplier.map((s: { value: string }) => ({
          value: s.value,
        })),
        number: formValue.loan_terms.number,
        contract_date: formValue.loan_terms.contract_date
          ? new Date(formValue.loan_terms.contract_date).toISOString()
          : '',
        bank_credit_amount: {
          value: formValue.loan_terms.bank_credit_amount.value,
          currency: formValue.loan_terms.bank_credit_amount.currency,
        },
        credit_info: formValue.loan_terms.credit_info.map(
          (ci: {
            payment_terms: string;
            amount: string;
            currency: string;
          }) => ({
            payment_terms: ci.payment_terms,
            amount: ci.amount,
            currency: ci.currency,
          })
        ),
        lt_line: formValue.loan_terms.lt_line
          ? formValue.loan_terms.lt_line.name
          : null,
      },
      funding_source: formValue.funding_source.map(
        (fs: { loan_term: Date; grace_period: Date }) => ({
          loan_term: fs.loan_term ? new Date(fs.loan_term).toISOString() : '',
          grace_period: fs.grace_period
            ? new Date(fs.grace_period).toISOString()
            : '',
        })
      ),
      financing_terms: {
        loan_term: formValue.financing_terms.loan_term
          ? new Date(formValue.financing_terms.loan_term).toISOString()
          : '',
        grace_period: formValue.financing_terms.grace_period
          ? new Date(formValue.financing_terms.grace_period).toISOString()
          : '',
        tranche_term: formValue.financing_terms.tranche_term
          ? new Date(formValue.financing_terms.tranche_term).toISOString()
          : '',
        creditLineAmount: {
          value: formValue.financing_terms.creditLineAmount.value,
          currency: formValue.financing_terms.creditLineAmount.currency,
        },
        total_interest_rate: formValue.financing_terms.total_interest_rate,
        foreign_bank_margin: formValue.financing_terms.foreign_bank_margin,
        floating_rate: {
          value: formValue.financing_terms.floating_rate.value,
          type: formValue.financing_terms.floating_rate.type,
        },
        tax_rate: {
          value: formValue.financing_terms.tax_rate.value,
          type: formValue.financing_terms.tax_rate.type,
        },
        repayment_freq: formValue.financing_terms.repayment_freq,
        freq: formValue.financing_terms.freq,
        comission_type: {
          value: formValue.financing_terms.comission_type.value,
          type: formValue.financing_terms.comission_type.type,
        },
      },
    };
  }

  constructor() {
    super();
    this.form = new FormGroup<CreditBlankForm>({
      branch: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      unique_type: new FormControl('credit_blank_id', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      note: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      unique_id: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      is_reser_wout_tranche: new FormControl(false, { nonNullable: true }),

      loan_terms: new FormGroup({
        project_initiator: new FormControl('', { nonNullable: true }),
        import_contract_subject: new FormControl('', { nonNullable: true }),
        supplier: new FormArray([
          new FormGroup({ value: new FormControl('', { nonNullable: true }) }),
        ]),
        number: new FormControl('', { nonNullable: true }),
        contract_date: new FormControl<Date | null>(null, {
          nonNullable: true,
        }),
        bank_credit_amount: new FormGroup({
          value: new FormControl('', { nonNullable: true }),
          currency: new FormControl('', { nonNullable: true }),
        }),
        credit_info: new FormArray([
          new FormGroup({
            payment_terms: new FormControl('', { nonNullable: true }),
            amount: new FormControl('', { nonNullable: true }),
            currency: new FormControl('', { nonNullable: true }),
          }),
        ]),
        unique_type: new FormControl('line', { nonNullable: true }),
        lt_line: new FormControl<File | null>(null),
      }),

      funding_source: new FormArray([
        new FormGroup({
          loan_term: new FormControl<Date | null>(null, { nonNullable: true }),
          grace_period: new FormControl<Date | null>(null, {
            nonNullable: true,
          }),
        }),
      ]),

      financing_terms: new FormGroup({
        loan_term: new FormControl<Date | null>(null, { nonNullable: true }),
        grace_period: new FormControl<Date | null>(null, { nonNullable: true }),
        tranche_term: new FormControl<Date | null>(null, { nonNullable: true }),
        creditLineAmount: new FormGroup({
          value: new FormControl('', { nonNullable: true }),
          currency: new FormControl('', { nonNullable: true }),
        }),
        total_interest_rate: new FormControl('', { nonNullable: true }),
        foreign_bank_margin: new FormControl('', { nonNullable: true }),
        floating_rate: new FormGroup({
          value: new FormControl('', { nonNullable: true }),
          type: new FormControl(
            { value: '', disabled: true },
            { nonNullable: true }
          ),
        }),
        tax_rate: new FormGroup({
          value: new FormControl('', { nonNullable: true }),
          type: new FormControl(
            { value: '', disabled: true },
            { nonNullable: true }
          ),
        }),
        repayment_freq: new FormControl('', { nonNullable: true }),
        freq: new FormControl('', { nonNullable: true }),
        comission_type: new FormGroup({
          value: new FormControl('', { nonNullable: true }),
          type: new FormControl(
            { value: '', disabled: true },
            { nonNullable: true }
          ),
        }),
      }),
      early_repayment_condition: new FormGroup({
        first_area: new FormControl('', { nonNullable: true }),
        second_area: new FormControl('', { nonNullable: true }),
      }),
    });
  }

  get loan_terms() {
    return this.form.get('loan_terms') as FormGroup;
  }
  get supplier() {
    return this.loan_terms.get('supplier') as FormArray;
  }
  addSupplier() {
    this.supplier.push(
      new FormGroup({ value: new FormControl('', { nonNullable: true }) })
    );
  }
  removeSupplier(index: number) {
    this.supplier.removeAt(index);
  }

  get creditInfo() {
    return this.loan_terms.controls['credit_info'] as FormArray;
  }
  addCreditInfo() {
    this.creditInfo.push(
      new FormGroup({
        payment_terms: new FormControl('', { nonNullable: true }),
        amount: new FormControl('', { nonNullable: true }),
        currency: new FormControl('', { nonNullable: true }),
      })
    );
  }
  removeCreditInfo(index: number) {
    this.creditInfo.removeAt(index);
  }

  get funding_array() {
    return this.form.controls['funding_source'] as FormArray;
  }
  addFundingSource() {
    this.funding_array.push(
      new FormGroup({
        loan_term: new FormControl(new Date(), { nonNullable: true }),
        grace_period: new FormControl(new Date(), { nonNullable: true }),
      })
    );
  }
  removeFundingSource(index: number) {
    this.funding_array.removeAt(index);
  }
}
