import { Component, inject, Input } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-date-picker',
  imports: [FloatLabelModule, DatePickerModule, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: ` <p-floatlabel class="w-full" variant="on">
    <p-datepicker
      class="w-full"
      [formControlName]="controlName"
      [inputId]="controlName"
      showIcon
      size="small"
      iconDisplay="input"
    />
    <label [for]="controlName">{{ label }}</label>
  </p-floatlabel>`,
  styleUrl: './date-picker.css',
})
export class DatePicker {
  parentContainer = inject(ControlContainer);
  @Input({ required: true }) label!: string;
  @Input({ required: true }) controlName!: string;

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlName,
      new FormControl('', Validators.required)
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }
}
