import { Component, inject, OnInit } from '@angular/core';
import { CustomTable } from '../../../../../shared/table/table';
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
export class Receipts implements OnInit {
  receiptsCols = [
    {
      header: 'Transh',
      field: 'transh',
      type: 'string',
      customExportHeader: 'Transh Code',
    },
    { header: 'Transaction', type: 'string', field: 'transaction' },
    { header: 'Document Date', field: 'doc_date', type: 'date' },
    { header: 'Status', field: 'status', type: 'string' },
    { header: 'Remained', field: 'remained', type: 'string' },
  ];
  receiptsData!: Product[];

  receiptService = inject(ReceiptsService);
  constructor() {
    this.receiptsData = this.receiptService.getReceipts();
  }

  ngOnInit() {}
}
