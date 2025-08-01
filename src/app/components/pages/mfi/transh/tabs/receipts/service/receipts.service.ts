import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReceiptsService {
  getReceipts() {
    return [
      {
        id: 1,
        transh: 'T1',
        transaction: 'TXN1001',
        doc_date: new Date('2024-01-01'),
        status: 'Completed',
        remained: 25,
      },
      {
        id: 2,
        transh: 'T2',
        transaction: 'TXN1002',
        doc_date: new Date('2024-02-15'),
        status: 'Pending',
        remained: 50,
      },
      {
        id: 3,
        transh: 'T3',
        transaction: 'TXN1003',
        doc_date: new Date('2023-12-10'),
        status: 'Rejected',
        remained: 0,
      },
      {
        id: 4,
        transh: 'T4',
        transaction: 'TXN1004',
        doc_date: new Date('2025-01-10'),
        status: 'Completed',
        remained: 10,
      },
      {
        id: 5,
        transh: 'T5',
        transaction: 'TXN1005',
        doc_date: new Date('2023-11-05'),
        status: 'Pending',
        remained: 100,
      },
      {
        id: 6,
        transh: 'T6',
        transaction: 'TXN1006',
        doc_date: new Date('2024-06-20'),
        status: 'Rejected',
        remained: 12,
      },
    ];
  }
}
