// commission-form.component.ts
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface CommissionFormData {
  summaPost: number | null;
  ostatkaPost: number | null;
  summaTransh: number | null;
  ispolzovanie: string;
  dostupno: number | null;
  zaprSumma: number | null;
  dataValyut: string;
  vidSumma: string;
  deystvie: string;
  fayl: File | null;
  status: string;
}

@Component({
  selector: 'app-receipts',
  templateUrl: 'receipts.html',
  imports: [NgIf, NgFor, ReactiveFormsModule, JsonPipe],
})
export class Receipts implements OnInit {
  mainForm: FormGroup;

  // Dropdown options
  commissionTypeOptions = [
    { value: 'key', label: 'Key' },
    { value: 'percentage', label: 'Percentage' },
    { value: 'fixed', label: 'Fixed' },
  ];

  ispolzovanieOptions = [
    { value: 'active', label: 'Активный' },
    { value: 'inactive', label: 'Неактивный' },
  ];

  deystvieOptions = [
    { value: 'active', label: 'Активен' },
    { value: 'inactive', label: 'Неактивен' },
  ];

  currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'UZS', label: 'UZS' },
  ];

  statusOptions = [
    { value: 'pending', label: 'Отправлять Га' },
    { value: 'sent', label: 'Отправлено' },
    { value: 'confirmed', label: 'Подтверждено' },
  ];

  constructor(private fb: FormBuilder) {
    this.mainForm = this.createMainForm();
  }

  ngOnInit(): void {
    // Boshlang'ich bitta qator qo'shish
    this.addFormItem();
  }

  // Asosiy formani yaratish
  createMainForm(): FormGroup {
    return this.fb.group({
      commissionType: ['', [Validators.required]],
      formItems: this.fb.array([]),
    });
  }

  // Form array ni olish
  get formItemsArray(): FormArray {
    return this.mainForm.get('formItems') as FormArray;
  }

  // Yangi form item yaratish
  createFormItem(): FormGroup {
    return this.fb.group({
      summaPost: [null, [Validators.min(0)]],
      ostatkaPost: [null, [Validators.min(0)]],
      summaTransh: [null, [Validators.min(0)]],
      ispolzovanie: ['active', [Validators.required]],
      dostupno: [null, [Validators.min(0)]],
      zaprSumma: [null, [Validators.min(0)]],
      dataValyut: ['', [Validators.required]],
      vidSumma: ['USD', [Validators.required]],
      deystvie: ['active', [Validators.required]],
      fayl: [null],
      status: ['pending', [Validators.required]],
    });
  }

  // Yangi qator qo'shish
  addFormItem(): void {
    const newItem = this.createFormItem();
    this.formItemsArray.push(newItem);
  }

  // Qatorni o'chirish
  removeFormItem(index: number): void {
    if (this.formItemsArray.length > 1) {
      this.formItemsArray.removeAt(index);
    }
  }

  // Fayl yuklash
  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const control = this.formItemsArray.at(index).get('fayl');
      control?.setValue(file);
    }
  }

  // Formani tozalash
  clearAllItems(): void {
    this.formItemsArray.clear();
    this.addFormItem();
    this.mainForm.get('commissionType')?.setValue('');
  }

  // Formani saqlash
  onSubmit(): void {
    if (this.mainForm.valid) {
      const formData = {
        commissionType: this.mainForm.get('commissionType')?.value,
        items: this.formItemsArray.value,
      };

      console.log('Form Data:', formData);

      // API ga yuborish
      this.submitToAPI(formData);
    } else {
      this.markFormGroupTouched();
      console.log('Form is invalid');
    }
  }

  // Form validatsiya xatolarini ko'rsatish
  private markFormGroupTouched(): void {
    Object.keys(this.mainForm.controls).forEach((key) => {
      const control = this.mainForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach((item) => {
          Object.keys((item as FormGroup).controls).forEach((nestedKey) => {
            item.get(nestedKey)?.markAsTouched();
          });
        });
      }
    });
  }

  // API ga yuborish
  private submitToAPI(data: any): void {
    // Bu yerda HTTP service orqali API ga yuborish logikasi bo'ladi
    console.log('Submitting to API:', data);

    // Misol:
    // this.commissionService.saveCommissionData(data).subscribe(
    //   response => {
    //     console.log('Success:', response);
    //   },
    //   error => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  // Input validatsiya xatolari
  getFieldError(index: number, fieldName: string): string | null {
    const field = this.formItemsArray.at(index).get(fieldName);

    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return 'Bu maydon majburiy';
      }
      if (field.errors['min']) {
        return "Qiymat 0 dan katta bo'lishi kerak";
      }
    }

    return null;
  }

  // Form item ning validligini tekshirish
  isFormItemValid(index: number): boolean {
    return this.formItemsArray.at(index).valid;
  }

  // Debug uchun
  getFormValue(): any {
    return {
      valid: this.mainForm.valid,
      value: this.mainForm.value,
      errors: this.getFormErrors(),
    };
  }

  private getFormErrors(): any {
    const errors: any = {};

    Object.keys(this.mainForm.controls).forEach((key) => {
      const control = this.mainForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });

    return errors;
  }
}

// commission-form.component.html
/*

*/

// app.module.ts ga qo'shish kerak:
/*
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    // other imports...
  ],
})
*/
