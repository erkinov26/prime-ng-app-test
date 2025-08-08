import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [ReactiveFormsModule, SelectModule, FloatLabelModule],
  template: `
    <label [for]="controlName">{{
      options && options.length ? label : 'No Option to Select'
    }}</label>
    <p-select
      [placeholder]="placeholder"
      class="w-full min-h-[35px]"
      [options]="options || []"
      [formControl]="control"
      optionLabel="name"
      optionValue="code"
    ></p-select>
  `,
  styleUrl: './select-input.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class SelectInput implements OnInit, OnDestroy {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) options!: { name: string; code: string }[] | null;
  @Input({ required: true }) controlName!: string;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() externallClass: string = '';

  private parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  control!: FormControl;

  ngOnInit(): void {
    const isDisabled =
      !this.options || this.options.length === 0 || this.disabled;

    this.control = new FormControl(
      { value: '', disabled: isDisabled },
      Validators.required
    );

    this.parentFormGroup.addControl(this.controlName, this.control);
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup.contains(this.controlName)) {
      this.parentFormGroup.removeControl(this.controlName);
    }
  }
}
