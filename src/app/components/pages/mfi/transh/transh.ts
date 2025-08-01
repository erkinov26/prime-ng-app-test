import { Component, OnInit } from '@angular/core';
import { TranshTabs } from "./tabs/transh-tabs";

@Component({
  selector: 'transh',
  templateUrl: './transh.html',
  imports: [TranshTabs],
})
export class Transh implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('transh list is started');
    
  }
}
