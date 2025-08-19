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
import {
  CreditBlankForm,
  CreditBlankPayload,
  EBankCreditAmount,
  EComissionType,
  ECreditBlanForm,
  ECreditInfo,
  ECreditLineAmount,
  EEarlyRepaymentCondition,
  EFinancingTerms,
  EFloatingRate,
  EFundingSource,
  ELoanTerms,
  ESupplier,
  ETaxRate,
} from './core/covenant.interface';

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
  ECreditBlanForm = ECreditBlanForm;
  ELoanTerms = ELoanTerms;
  ESupplier = ESupplier;
  EBankCreditAmount = EBankCreditAmount;
  ECreditInfo = ECreditInfo;
  ECreditLineAmount = ECreditLineAmount;
  EFundingSource = EFundingSource;
  EFinancingTerms = EFinancingTerms;
  EFloatingRate = EFloatingRate;
  ETaxRate = ETaxRate;
  EComissionType = EComissionType;
  EEarlyRepaymentCondition = EEarlyRepaymentCondition;

  mapFormToPayload(formValue: any): CreditBlankPayload {
    return {
      [ECreditBlanForm.BRANCH]: formValue[ECreditBlanForm.BRANCH],
      [ECreditBlanForm.UNIQUE_ID]: formValue[ECreditBlanForm.UNIQUE_ID],
      [ECreditBlanForm.IS_RESER_WOUT_TRANCHE]:
        formValue[ECreditBlanForm.IS_RESER_WOUT_TRANCHE],

      [ECreditBlanForm.LOAN_TERMS]: {
        [ELoanTerms.PROJECT_INITATOR]:
          formValue[ECreditBlanForm.LOAN_TERMS][ELoanTerms.PROJECT_INITATOR],
        [ELoanTerms.IMPORT_CONTRACT_SUBJECT]:
          formValue[ECreditBlanForm.LOAN_TERMS][
            ELoanTerms.IMPORT_CONTRACT_SUBJECT
          ],
        [ELoanTerms.SUPPLIER]: formValue[ECreditBlanForm.LOAN_TERMS][
          ELoanTerms.SUPPLIER
        ].map((s: any) => ({
          [ESupplier.VALUE]: s[ESupplier.VALUE],
          [ESupplier.NUMBER]: s[ESupplier.NUMBER],
          [ESupplier.CONTRACT_DATE]: s[ESupplier.CONTRACT_DATE]
            ? new Date(s[ESupplier.CONTRACT_DATE]).toISOString()
            : '',
        })),
        [ELoanTerms.BANK_CREDIT_AMOUNT]: {
          [EBankCreditAmount.VALUE]:
            formValue[ECreditBlanForm.LOAN_TERMS][
              ELoanTerms.BANK_CREDIT_AMOUNT
            ][EBankCreditAmount.VALUE],
          [EBankCreditAmount.CURRENCY]:
            formValue[ECreditBlanForm.LOAN_TERMS][
              ELoanTerms.BANK_CREDIT_AMOUNT
            ][EBankCreditAmount.CURRENCY],
        },
        [ELoanTerms.CREDIT_INFO]: formValue[ECreditBlanForm.LOAN_TERMS][
          ELoanTerms.CREDIT_INFO
        ].map((ci: any) => ({
          [ECreditInfo.PAYMENT_TERMS]: ci[ECreditInfo.PAYMENT_TERMS],
          [ECreditInfo.AMOUNT]: ci[ECreditInfo.AMOUNT],
          [ECreditInfo.CURRENCY]: ci[ECreditInfo.CURRENCY],
        })),
        [ELoanTerms.LT_LINE]: formValue[ECreditBlanForm.LOAN_TERMS][
          ELoanTerms.LT_LINE
        ]
          ? formValue[ECreditBlanForm.LOAN_TERMS][ELoanTerms.LT_LINE].name
          : null,
      },

      [ECreditBlanForm.FUNDING_SOURCE]: formValue[
        ECreditBlanForm.FUNDING_SOURCE
      ].map((fs: any) => ({
        [EFundingSource.LOAN_TERM]: fs[EFundingSource.LOAN_TERM]
          ? new Date(fs[EFundingSource.LOAN_TERM]).toISOString()
          : '',
        [EFundingSource.GRACE_PERIOD]: fs[EFundingSource.GRACE_PERIOD]
          ? new Date(fs[EFundingSource.GRACE_PERIOD]).toISOString()
          : '',
        [EFundingSource.FINANCING_TERMS]: {
          [EFinancingTerms.CREDIT_LINE_AMOUNT]: {
            [ECreditLineAmount.VALUE]:
              fs[EFundingSource.FINANCING_TERMS][
                EFinancingTerms.CREDIT_LINE_AMOUNT
              ][ECreditLineAmount.VALUE],
            [ECreditLineAmount.CURRENCY]:
              fs[EFundingSource.FINANCING_TERMS][
                EFinancingTerms.CREDIT_LINE_AMOUNT
              ][ECreditLineAmount.CURRENCY],
          },
          [EFinancingTerms.TOTAL_INTEREST_RATE]:
            fs[EFundingSource.FINANCING_TERMS][
              EFinancingTerms.TOTAL_INTEREST_RATE
            ],
          [EFinancingTerms.FOREIGN_BANK_MARGIN]:
            fs[EFundingSource.FINANCING_TERMS][
              EFinancingTerms.FOREIGN_BANK_MARGIN
            ],
          [EFinancingTerms.FLOATING_RATE]: {
            [EFloatingRate.VALUE]:
              fs[EFundingSource.FINANCING_TERMS][EFinancingTerms.FLOATING_RATE][
                EFloatingRate.VALUE
              ],
            [EFloatingRate.TYPE]:
              fs[EFundingSource.FINANCING_TERMS][EFinancingTerms.FLOATING_RATE][
                EFloatingRate.TYPE
              ],
          },
          [EFinancingTerms.TAX_RATE]: {
            [ETaxRate.VALUE]:
              fs[EFundingSource.FINANCING_TERMS][EFinancingTerms.TAX_RATE][
                ETaxRate.VALUE
              ],
            [ETaxRate.TYPE]:
              fs[EFundingSource.FINANCING_TERMS][EFinancingTerms.TAX_RATE][
                ETaxRate.TYPE
              ],
          },
          [EFinancingTerms.REPAYMENT_FREQ]:
            fs[EFundingSource.FINANCING_TERMS][EFinancingTerms.REPAYMENT_FREQ],
          [EFinancingTerms.FREQ]:
            fs[EFundingSource.FINANCING_TERMS][EFinancingTerms.FREQ],
          [EFinancingTerms.COMISSION_TYPE]: {
            [EComissionType.VALUE]:
              fs[EFundingSource.FINANCING_TERMS][
                EFinancingTerms.COMISSION_TYPE
              ][EComissionType.VALUE],
            [EComissionType.TYPE]:
              fs[EFundingSource.FINANCING_TERMS][
                EFinancingTerms.COMISSION_TYPE
              ][EComissionType.TYPE],
          },
        },
      })),
    };
  }

  constructor() {
    super();
    this.form = new FormGroup<CreditBlankForm>({
      [ECreditBlanForm.BRANCH]: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [ECreditBlanForm.UNIQUE_TYPE]: new FormControl('credit_blank_id', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [ECreditBlanForm.UNIQUE_ID]: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [ECreditBlanForm.NOTE]: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      [ECreditBlanForm.IS_RESER_WOUT_TRANCHE]: new FormControl(false, {
        nonNullable: true,
      }),

      [ECreditBlanForm.LOAN_TERMS]: new FormGroup({
        [ELoanTerms.PROJECT_INITATOR]: new FormControl('', {
          nonNullable: true,
        }),
        [ELoanTerms.UNIQUE_TYPE]: new FormControl('line', {
          nonNullable: true,
        }),
        [ELoanTerms.IMPORT_CONTRACT_SUBJECT]: new FormControl('', {
          nonNullable: true,
        }),

        [ELoanTerms.SUPPLIER]: new FormArray([
          new FormGroup({
            [ESupplier.VALUE]: new FormControl('', { nonNullable: true }),
            [ESupplier.NUMBER]: new FormControl('', { nonNullable: true }),
            [ESupplier.CONTRACT_DATE]: new FormControl<Date | null>(null, {
              nonNullable: true,
            }),
          }),
        ]),

        [ELoanTerms.BANK_CREDIT_AMOUNT]: new FormGroup({
          [EBankCreditAmount.VALUE]: new FormControl('', { nonNullable: true }),
          [EBankCreditAmount.CURRENCY]: new FormControl('', {
            nonNullable: true,
          }),
        }),

        [ELoanTerms.CREDIT_INFO]: new FormArray([
          new FormGroup({
            [ECreditInfo.PAYMENT_TERMS]: new FormControl('', {
              nonNullable: true,
            }),
            [ECreditInfo.AMOUNT]: new FormControl('', { nonNullable: true }),
            [ECreditInfo.CURRENCY]: new FormControl('', { nonNullable: true }),
          }),
        ]),

        [ELoanTerms.LT_LINE]: new FormControl<File | null>(null),
        // [ELoanTerms.LT_TRANCHE]: new FormControl<File | null>(null),
      }),

      [ECreditBlanForm.FUNDING_SOURCE]: new FormArray([
        new FormGroup({
          [EFundingSource.LOAN_TERM]: new FormControl<Date | null>(null, {
            nonNullable: true,
          }),
          [EFundingSource.GRACE_PERIOD]: new FormControl<Date | null>(null, {
            nonNullable: true,
          }),

          [EFundingSource.FINANCING_TERMS]: new FormGroup({
            [EFinancingTerms.LOAN_TERM]: new FormControl<Date | null>(null, {
              nonNullable: true,
            }),
            [EFinancingTerms.GRACE_PERIOD]: new FormControl<Date | null>(null, {
              nonNullable: true,
            }),
            [EFinancingTerms.TRANCHE_TERM]: new FormControl<Date | null>(null, {
              nonNullable: true,
            }),
            [EFinancingTerms.CREDIT_LINE_AMOUNT]: new FormGroup({
              [ECreditLineAmount.VALUE]: new FormControl('', {
                nonNullable: true,
              }),
              [ECreditLineAmount.CURRENCY]: new FormControl('', {
                nonNullable: true,
              }),
            }),
            [EFinancingTerms.TOTAL_INTEREST_RATE]: new FormControl('', {
              nonNullable: true,
            }),
            [EFinancingTerms.FOREIGN_BANK_MARGIN]: new FormControl('', {
              nonNullable: true,
            }),
            [EFinancingTerms.FLOATING_RATE]: new FormGroup({
              [EFloatingRate.VALUE]: new FormControl('', { nonNullable: true }),
              [EFloatingRate.TYPE]: new FormControl(
                { value: '', disabled: true },
                { nonNullable: true }
              ),
            }),
            [EFinancingTerms.TAX_RATE]: new FormGroup({
              [ETaxRate.VALUE]: new FormControl('', { nonNullable: true }),
              [ETaxRate.TYPE]: new FormControl(
                { value: '', disabled: true },
                { nonNullable: true }
              ),
            }),
            [EFinancingTerms.REPAYMENT_FREQ]: new FormControl('', {
              nonNullable: true,
            }),
            [EFinancingTerms.FREQ]: new FormControl('', { nonNullable: true }),
            [EFinancingTerms.COMISSION_TYPE]: new FormGroup({
              [EComissionType.VALUE]: new FormControl('', {
                nonNullable: true,
              }),
              [EComissionType.TYPE]: new FormControl(
                { value: '', disabled: true },
                { nonNullable: true }
              ),
            }),
          }),
        }),
      ]),

      [ECreditBlanForm.EARLY_REPAYMENT_CONDITION]: new FormGroup({
        [EEarlyRepaymentCondition.FIRST_AREA]: new FormControl('', {
          nonNullable: true,
        }),
      }),
    });
  }

  get loan_terms() {
    return this.form.get([ECreditBlanForm.LOAN_TERMS]) as FormGroup;
  }
  get supplier() {
    return this.loan_terms.get([ELoanTerms.SUPPLIER]) as FormArray;
  }

  addSupplier() {
    this.supplier.push(
      new FormGroup({
        [ESupplier.VALUE]: new FormControl('', { nonNullable: true }),
        [ESupplier.NUMBER]: new FormControl('', { nonNullable: true }),
        [ESupplier.CONTRACT_DATE]: new FormControl(new Date(), {
          nonNullable: true,
        }),
      })
    );
  }
  removeSupplier(index: number) {
    this.supplier.removeAt(index);
  }

  get creditInfo() {
    return this[ECreditBlanForm.LOAN_TERMS].controls[
      ELoanTerms.CREDIT_INFO
    ] as FormArray;
  }
  addCreditInfo() {
    this.creditInfo.push(
      new FormGroup({
        [ECreditInfo.PAYMENT_TERMS]: new FormControl('', { nonNullable: true }),
        [ECreditInfo.AMOUNT]: new FormControl('', { nonNullable: true }),
        [ECreditInfo.CURRENCY]: new FormControl('', { nonNullable: true }),
      })
    );
  }
  removeCreditInfo(index: number) {
    this.creditInfo.removeAt(index);
  }

  get funding_array() {
    return this.form.controls[ECreditBlanForm.FUNDING_SOURCE] as FormArray;
  }
  addFundingSource() {
    this.funding_array.push(
      new FormGroup({
        [EFundingSource.LOAN_TERM]: new FormControl(new Date(), {
          nonNullable: true,
        }),
        [EFundingSource.GRACE_PERIOD]: new FormControl(new Date(), {
          nonNullable: true,
        }),
        [EFundingSource.FINANCING_TERMS]: new FormGroup({
          [EFinancingTerms.LOAN_TERM]: new FormControl(new Date(), {
            nonNullable: true,
          }),
          [EFinancingTerms.GRACE_PERIOD]: new FormControl(new Date(), {
            nonNullable: true,
          }),
          [EFinancingTerms.TRANCHE_TERM]: new FormControl(new Date(), {
            nonNullable: true,
          }),
          [EFinancingTerms.CREDIT_LINE_AMOUNT]: new FormGroup({
            [ECreditLineAmount.VALUE]: new FormControl('', {
              nonNullable: true,
            }),
            [ECreditLineAmount.CURRENCY]: new FormControl('', {
              nonNullable: true,
            }),
          }),
          [EFinancingTerms.TOTAL_INTEREST_RATE]: new FormControl('', {
            nonNullable: true,
          }),
          [EFinancingTerms.FOREIGN_BANK_MARGIN]: new FormControl('', {
            nonNullable: true,
          }),
          [EFinancingTerms.FLOATING_RATE]: new FormGroup({
            [EFloatingRate.VALUE]: new FormControl('', {
              nonNullable: true,
            }),
            [EFloatingRate.TYPE]: new FormControl('', {
              nonNullable: true,
            }),
          }),
          [EFinancingTerms.TAX_RATE]: new FormGroup({
            [ETaxRate.VALUE]: new FormControl('', {
              nonNullable: true,
            }),
            [ETaxRate.TYPE]: new FormControl('', {
              nonNullable: true,
            }),
          }),
          [EFinancingTerms.REPAYMENT_FREQ]: new FormControl('', {
            nonNullable: true,
          }),
          [EFinancingTerms.FREQ]: new FormControl('', {
            nonNullable: true,
          }),
          [EFinancingTerms.COMISSION_TYPE]: new FormGroup({
            [EComissionType.VALUE]: new FormControl('', {
              nonNullable: true,
            }),
            [EComissionType.TYPE]: new FormControl('', {
              nonNullable: true,
            }),
          }),
        }),
      })
    );
  }

  removeFundingSource(index: number) {
    this.funding_array.removeAt(index);
  }
}
