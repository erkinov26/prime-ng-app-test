import { Component, OnInit } from '@angular/core';
import { CustomTable } from "../../../../../shared/table/table";

@Component({
  selector: 'receipts',
  templateUrl: 'receipts.html',
  imports: [CustomTable],
})
export class Receipts implements OnInit {
  constructor() {}

  ngOnInit() {}
}
