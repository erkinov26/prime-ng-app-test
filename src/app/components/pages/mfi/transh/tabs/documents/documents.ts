import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface FormLabelT {
  label: string;
  type: 'text' | 'number' | 'select';
  key: string;
}

@Component({
  selector: 'transh-documents',
  templateUrl: 'documents.html',
  imports: [InputTextModule, FormsModule, ButtonModule, NgClass],
  standalone: true,
})
export class Documents implements OnInit {
  constructor() {}

  formLabel: FormLabelT[] = [
    { key: 'liniya', label: 'Линия', type: 'text' },
    { key: 'contractNumber', label: '№ договора', type: 'text' },
    { key: 'contractDate', label: 'Дата договора', type: 'text' },
    {
      key: 'baseAgreementAmount',
      label: 'Сумма базового соглашения',
      type: 'text',
    },
    { key: 'startDate', label: 'Дата начала', type: 'text' },
    { key: 'endDate', label: 'Дата окончания', type: 'text' },
    { key: 'purpose', label: 'Назначение', type: 'text' },
    { key: 'renewalType', label: 'Тип возобновления', type: 'text' },
    { key: 'currency', label: 'Валюта', type: 'text' },
    { key: 'guarantee', label: 'Гарантия', type: 'text' },
    {
      key: 'maxCreditAmount',
      label: 'Максимальная сумма кредита',
      type: 'text',
    },
    {
      key: 'minCreditAmount',
      label: 'Минимальная сумма кредита',
      type: 'text',
    },
    {
      key: 'maxCreditTerm',
      label: 'Максимальный срок кредита выделяемого за счет кредитной линии',
      type: 'text',
    },
    {
      key: 'indicativeInterestRate',
      label:
        'Индикативная процентная ставка (плавающая процентная ставка, индивидуальная марка инобанка по кредитной заявке)',
      type: 'text',
    },
    {
      key: 'gracePeriod',
      label: 'Льготный период по кредитной линии',
      type: 'text',
    },
    { key: 'commitmentFee', label: 'Комиссия обязательства', type: 'text' },
    {
      key: 'unusedCreditFee',
      label:
        'Размер комиссии % за обязательства по неиспользованной части кредита (линии)',
      type: 'text',
    },
    {
      key: 'managementFee',
      label: 'Размер комиссии за управление',
      type: 'text',
    },
    {
      key: 'commissionTypes',
      label: 'Виды и размеры комиссии, оплачиваемые клиентом банка',
      type: 'text',
    },
    {
      key: 'ekaCommission',
      label:
        'Индиктивный размер премии (комиссии) экспортно-кредитного агентства (ЭКА)',
      type: 'text',
    },
    {
      key: 'contractShareFinanced',
      label: 'Доля суммы контракта финансируемая за счет кредитных средств',
      type: 'text',
    },
    {
      key: 'allowedRegions',
      label:
        'Регионы в которых разрешена использование средств кредитной линии',
      type: 'text',
    },
    {
      key: 'bankParticipationRequirement',
      label: 'Требование к доле участия банка в финансировании проекте',
      type: 'text',
    },
  ];
  formData: {
    // liniya: string;
    // contractNumber: string;
    // contractDate: string;
    // baseAgreementAmount: string;
    // startDate: string;
    // endDate: string;
    // purpose: string;
    // renewalType: string;
    // currency: string;
    // guarantee: string;
    // maxCreditAmount: string;
    // minCreditAmount: string;
    // maxCreditTerm: string;
    // indicativeInterestRate: string;
    // gracePeriod: string;
    // commitmentFee: string;
    // unusedCreditFee: string;
    // managementFee: string;
    // commissionTypes: string;
    // ekaCommission: string;
    // contractShareFinanced: string;
    // allowedRegions: string;
    // bankParticipationRequirement: string;
    [key: string]: string;
  } = {
    liniya: '',
    contractNumber: '',
    contractDate: '',
    baseAgreementAmount: '',
    startDate: '',
    endDate: '',
    purpose: '',
    renewalType: '',
    currency: '',
    guarantee: '',
    maxCreditAmount: '',
    minCreditAmount: '',
    maxCreditTerm: '',
    indicativeInterestRate: '',
    gracePeriod: '',
    commitmentFee: '',
    unusedCreditFee: '',
    managementFee: '',
    commissionTypes: '',
    ekaCommission: '',
    contractShareFinanced: '',
    allowedRegions: '',
    bankParticipationRequirement: '',
  };

  ngOnInit() {}
  onSubmit(data: any) {
    console.log(data.value);
  }
}
