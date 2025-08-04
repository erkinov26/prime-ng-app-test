import { Component, inject, OnInit } from '@angular/core';
import { Column, CustomTable } from '../../../../../shared/table/table';
import { ReceiptsService } from './service/receipts.service';
interface Product {
  id: number;
  transh: string;
  transaction: string;
  doc_date: Date;
  status: string;
  remained: number;
  [key: string]: any;
}
@Component({
  selector: 'receipts',
  templateUrl: 'receipts.html',
  imports: [CustomTable],
})
export class Receipts {
  receiptService = inject(ReceiptsService);
  excelFieldMapping = {
    'Transh Code': 'transh',
    Transaction: 'transaction',
    'Document Date': 'doc_date',
    Status: 'status',
    Remained: 'remained',
  };
  receiptsCols: Column[] = [
    {
      header: 'Transh',
      field: 'transh',
      type: 'string',
      customExportHeader: 'Transh Code',
    },
    { header: 'Transaction', type: 'string', field: 'transaction' },
    { header: 'Document Date', field: 'doc_date', type: 'date' },
    {
      header: 'Status',
      field: 'status',
      type: 'select',
      options: [
        { code: 'pending', name: 'Pending' },
        { code: 'reject', name: 'Reject' },
        { code: 'accept', name: 'Accept' },
      ],
    },
    { header: 'Remained', field: 'remained', type: 'string' },
  ];
  receiptsData!: Product[];
  receiptsStructure: Product = {
    id: 0,
    transh: '',
    transaction: '',
    doc_date: new Date(),
    status: '',
    remained: 0,
  };
  constructor() {
    this.receiptsData = this.receiptService.getReceipts();
  }
}
