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
    <p-floatLabel variant="on">
      <p-select
        class="w-full"
        [options]="options"
        [formControlName]="controlName"
        optionLabel="name"
        optionValue="code"
      /><label [for]="controlName">{{ label }}</label>
    </p-floatLabel>
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
  @Input({ required: true }) options!: { name: string; code: string }[];
  @Input({ required: true }) controlName!: string;

  private parentContainer = inject(ControlContainer);

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
