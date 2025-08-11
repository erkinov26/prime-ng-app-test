import { NgIf } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [FileUploadModule, NgIf],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploader),
      multi: true,
    },
  ],
  template: `
    <p-fileupload
      mode="basic"
      chooseIcon="pi pi-upload"
      chooseLabel=""
      name="file"
      [accept]="accept"
      [maxFileSize]="maxFileSize"
      (onSelect)="onSelect($event)"
    ></p-fileupload>

    <div *ngIf="isUploaded" class="text-xs text-green-600 mt-1">Uploaded</div>
  `,
})
export class FileUploader implements ControlValueAccessor {
  @Input() accept = '.pdf,.doc,.docx,.jpg,.png';
  @Input() maxFileSize = 100000000000000;

  isUploaded = false;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(value: File | null): void {
    if (value) {
      this.isUploaded = true;
    } else {
      this.isUploaded = false;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.isUploaded = true;
      this.onChange(file);
      this.onTouched();
    }
  }
}
