import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mfi-credit-line',
  templateUrl: 'credit-line.html',
})
export class MfiCreditLine implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('credit line oninit');
  }
}
