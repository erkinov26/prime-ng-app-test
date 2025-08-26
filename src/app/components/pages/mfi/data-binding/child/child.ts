import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  template: ` <h1>This is app-child</h1> `,
  styleUrl: './child.css',
})
export class Child implements OnInit {
  data = 'Data from the child';
  @Output() dataEvent = new EventEmitter<string>();

  constructor() {}
  ngOnInit(): void {
    this.dataEvent.emit(this.data);
  }
}
