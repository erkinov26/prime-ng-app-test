import {
  Component,
  inject,
  Input,
  OnInit,
  OnDestroy,
  computed,
  effect,
  signal,
} from '@angular/core';
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
    <p-floatLabel variant="on" class="w-full ">
      <p-select
        size="small"
        class="w-full min-h-[35px]"
        [options]="options || [{ name: '', code: '' }]"
        [formControl]="control"
        optionLabel="name"
        optionValue="code"
      ></p-select>
      <label [for]="controlName">{{
        options ? label : 'No Option to Select'
      }}</label>
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
  @Input({ required: true }) options!: { name: string; code: string }[] | null;
  @Input({ required: true }) controlName!: string;

  private parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  control!: FormControl;

  ngOnInit(): void {
    const isDisabled = !this.options || this.options.length === 0;

    this.control = new FormControl(
      { value: '', disabled: isDisabled },
      Validators.required
    );

    this.parentFormGroup.addControl(this.controlName, this.control);
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }
}
