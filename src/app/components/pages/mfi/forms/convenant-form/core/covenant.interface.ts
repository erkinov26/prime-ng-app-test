import { FormArray, FormControl, FormGroup } from '@angular/forms';

export enum ECreditBlanForm {
  BRANCH = 'branch',
  UNIQUE_TYPE = 'unique_type',
  UNIQUE_ID = 'unique_id',
  NOTE = 'note',
  IS_RESER_WOUT_TRANCHE = 'is_reser_wout_tranche',
  LOAN_TERMS = 'loan_terms',
  FUNDING_SOURCE = 'funding_source',
  EARLY_REPAYMENT_CONDITION = 'early_repayment_condition',
}

export enum ELoanTerms {
  PROJECT_INITATOR = 'project_initiator',
  UNIQUE_TYPE = 'unique_type',
  IMPORT_CONTRACT_SUBJECT = 'import_contract_subject',
  SUPPLIER = 'supplier',
  BANK_CREDIT_AMOUNT = 'bank_credit_amount',
  CREDIT_INFO = 'credit_info',
  LT_LINE = 'lt_line',
  //   LT_TRANCHE = 'lt_tranche',
}

export enum ESupplier {
  VALUE = 'value',
  NUMBER = 'number',
  CONTRACT_DATE = 'contract_date',
}
export enum EBankCreditAmount {
  VALUE = 'value',
  CURRENCY = 'currency',
}
export enum ECreditInfo {
  PAYMENT_TERMS = 'payment_terms',
  AMOUNT = 'amount',
  CURRENCY = 'currency',
}

export enum EFundingSource {
  LOAN_TERM = 'loan_term',
  GRACE_PERIOD = 'grace_period',
  FINANCING_TERMS = 'financing_terms',
}
export enum EFinancingTerms {
  LOAN_TERM = 'loan_term',
  GRACE_PERIOD = 'grace_period',
  TRANCHE_TERM = 'tranche_term',
  CREDIT_LINE_AMOUNT = 'creditLineAmount',
  TOTAL_INTEREST_RATE = 'total_interest_rate',
  FOREIGN_BANK_MARGIN = 'foreign_bank_margin',
  FLOATING_RATE = 'floating_rate',
  TAX_RATE = 'tax_rate',
  REPAYMENT_FREQ = 'repayment_freq',
  FREQ = 'freq',
  COMISSION_TYPE = 'comission_type',
}

export enum ECreditLineAmount {
  VALUE = 'value',
  CURRENCY = 'currency',
}

export enum EFloatingRate {
  VALUE = 'value',
  TYPE = 'type',
}

export enum ETaxRate {
  VALUE = 'value',
  TYPE = 'type',
}

export enum EComissionType {
  VALUE = 'value',
  TYPE = 'type',
}
export enum EEarlyRepaymentCondition {
  FIRST_AREA = 'first_area',
}
export interface CreditBlankForm {
  [ECreditBlanForm.BRANCH]: FormControl<string>;
  [ECreditBlanForm.UNIQUE_TYPE]: FormControl<string>;
  [ECreditBlanForm.UNIQUE_ID]: FormControl<string>;
  [ECreditBlanForm.NOTE]: FormControl<string>;
  [ECreditBlanForm.IS_RESER_WOUT_TRANCHE]: FormControl<boolean>;

  [ECreditBlanForm.LOAN_TERMS]: FormGroup<{
    [ELoanTerms.PROJECT_INITATOR]: FormControl<string>;
    [ELoanTerms.UNIQUE_TYPE]: FormControl<string>;
    [ELoanTerms.IMPORT_CONTRACT_SUBJECT]: FormControl<string>;

    [ELoanTerms.SUPPLIER]: FormArray<
      FormGroup<{
        [ESupplier.VALUE]: FormControl<string>;
        [ESupplier.NUMBER]: FormControl<string>;
        [ESupplier.CONTRACT_DATE]: FormControl<Date | null>;
      }>
    >;

    [ELoanTerms.BANK_CREDIT_AMOUNT]: FormGroup<{
      [EBankCreditAmount.VALUE]: FormControl<string>;
      [EBankCreditAmount.CURRENCY]: FormControl<string>;
    }>;

    [ELoanTerms.CREDIT_INFO]: FormArray<
      FormGroup<{
        [ECreditInfo.PAYMENT_TERMS]: FormControl<string>;
        [ECreditInfo.AMOUNT]: FormControl<string>;
        [ECreditInfo.CURRENCY]: FormControl<string>;
      }>
    >;

    [ELoanTerms.LT_LINE]: FormControl<File | null>;
    // [ELoanTerms.LT_TRANCHE]: FormControl<File | null>;
  }>;

  [ECreditBlanForm.FUNDING_SOURCE]: FormArray<
    FormGroup<{
      [EFundingSource.LOAN_TERM]: FormControl<Date | null>;
      [EFundingSource.GRACE_PERIOD]: FormControl<Date | null>;
      [EFundingSource.FINANCING_TERMS]: FormGroup<{
        [EFinancingTerms.LOAN_TERM]: FormControl<Date | null>;
        [EFinancingTerms.GRACE_PERIOD]: FormControl<Date | null>;
        [EFinancingTerms.TRANCHE_TERM]: FormControl<Date | null>;
        [EFinancingTerms.CREDIT_LINE_AMOUNT]: FormGroup<{
          [ECreditLineAmount.VALUE]: FormControl<string>;
          [ECreditLineAmount.CURRENCY]: FormControl<string>;
        }>;
        [EFinancingTerms.TOTAL_INTEREST_RATE]: FormControl<string>;
        [EFinancingTerms.FOREIGN_BANK_MARGIN]: FormControl<string>;
        [EFinancingTerms.FLOATING_RATE]: FormGroup<{
          [EFloatingRate.VALUE]: FormControl<string>;
          [EFloatingRate.TYPE]: FormControl<string>;
        }>;
        [EFinancingTerms.TAX_RATE]: FormGroup<{
          [ETaxRate.VALUE]: FormControl<string>;
          [ETaxRate.TYPE]: FormControl<string>;
        }>;
        [EFinancingTerms.REPAYMENT_FREQ]: FormControl<string>;
        [EFinancingTerms.FREQ]: FormControl<string>;
        [EFinancingTerms.COMISSION_TYPE]: FormGroup<{
          [EComissionType.VALUE]: FormControl<string>;
          [EComissionType.TYPE]: FormControl<string>;
        }>;
      }>;
    }>
  >;

  [ECreditBlanForm.EARLY_REPAYMENT_CONDITION]: FormGroup<{
    [EEarlyRepaymentCondition.FIRST_AREA]: FormControl<string>;
  }>;
}
export interface CreditBlankPayload {
  [ECreditBlanForm.BRANCH]: string;
  [ECreditBlanForm.UNIQUE_ID]: string;
  [ECreditBlanForm.IS_RESER_WOUT_TRANCHE]: boolean;
  [ECreditBlanForm.LOAN_TERMS]: {
    [ELoanTerms.PROJECT_INITATOR]: string;
    [ELoanTerms.IMPORT_CONTRACT_SUBJECT]: string;
    [ELoanTerms.SUPPLIER]: {
      [ESupplier.VALUE]: string;
      [ESupplier.NUMBER]: string;
      [ESupplier.CONTRACT_DATE]: string;
    }[];
    [ELoanTerms.BANK_CREDIT_AMOUNT]: {
      [EBankCreditAmount.VALUE]: string;
      [EBankCreditAmount.CURRENCY]: string;
    };
    [ELoanTerms.CREDIT_INFO]: {
      [ECreditInfo.PAYMENT_TERMS]: string;
      [ECreditInfo.AMOUNT]: string;
      [ECreditInfo.CURRENCY]: string;
    }[];
    [ELoanTerms.LT_LINE]: string | null;
    // [ELoanTerms.LT_TRANCHE]: string | null;
  };
  [ECreditBlanForm.FUNDING_SOURCE]: {
    [EFundingSource.LOAN_TERM]: string;
    [EFundingSource.GRACE_PERIOD]: string;
    [EFundingSource.FINANCING_TERMS]: {
      [EFinancingTerms.CREDIT_LINE_AMOUNT]: {
        [ECreditLineAmount.VALUE]: string;
        [ECreditLineAmount.CURRENCY]: string;
      };
      [EFinancingTerms.TOTAL_INTEREST_RATE]: string;
      [EFinancingTerms.FOREIGN_BANK_MARGIN]: string;
      [EFinancingTerms.FLOATING_RATE]: {
        [EFloatingRate.VALUE]: string;
        [EFloatingRate.TYPE]: string;
      };
      [EFinancingTerms.TAX_RATE]: {
        [ETaxRate.VALUE]: string;
        [ETaxRate.TYPE]: string;
      };
      [EFinancingTerms.REPAYMENT_FREQ]: string;
      [EFinancingTerms.FREQ]: string;
      [EFinancingTerms.COMISSION_TYPE]: {
        [EComissionType.VALUE]: string;
        [EComissionType.TYPE]: string;
      };
    };
  }[];
}
