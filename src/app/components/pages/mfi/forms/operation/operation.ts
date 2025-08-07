import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from "../../../../shared/inputs/text-input/text-input";

@Component({
  selector: 'app-operation',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './operation.html',
  styleUrl: './operation.css',
})
export class Operation {
  private fb = inject(FormBuilder);
  operation = this.fb.group({});

  onSubmit() {
    console.log(this.operation.value);
  }
}
