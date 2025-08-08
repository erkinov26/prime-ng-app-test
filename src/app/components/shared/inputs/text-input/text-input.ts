import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class TextInput implements OnInit, OnDestroy {
  parentContainer = inject(ControlContainer);
  @Input({ required: true }) label!: string;
  @Input() disabled: boolean = false;
  @Input({ required: true }) controlName!: string;
  @Input() placeholder: string = '';
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlName,
      new FormControl(
        { value: '', disabled: this.disabled },
        Validators.required
      )
    );
  }

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.controlName);
  }
}
