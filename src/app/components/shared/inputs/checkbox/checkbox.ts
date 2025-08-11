import { Component, inject, Input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-checkbox',
  imports: [CheckboxModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: ` <label [for]="controlName">{{ label }}</label
    ><p-checkbox
      [formControlName]="controlName"
      [id]="controlName"
      [binary]="true"
      
      size="small"
    />`,
  styleUrl: './checkbox.css',
})
export class Checkbox {
  parentContainer = inject(ControlContainer);
  @Input({ required: true }) label!: string;
  @Input({ required: true }) controlName!: string;
  @Input() disabled: boolean = false;
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlName,
      new FormControl(
        { value: false, disabled: this.disabled },
        Validators.required
      )
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }
}
