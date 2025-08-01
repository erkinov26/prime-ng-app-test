import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayModule } from 'primeng/overlay';
import { DatePickerModule } from 'primeng/datepicker';

import * as XLSX from 'xlsx';
import { MenuModule } from 'primeng/menu';
interface ExportColumn {
  title: string;
  dataKey: string;
}
interface Product {
  id: number;
  transh: string;
  transaction: string;
  doc_date: Date;
  status: string;
  remained: number;
  [key: string]: any;
}
interface Column {
  field: string;
  header: string;
  type: string;
  customExportHeader?: string;
}
@Component({
  selector: 'custom-table',
  templateUrl: 'table.html',
  standalone: true,
  imports: [
    DatePickerModule,
    OverlayModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    FormsModule,
    NgFor,
    DatePipe,
    CommonModule,
    ToastModule,
    MenuModule,
  ],
  providers: [MessageService, ConfirmationService],
  styles: `::ng-deep .no-label-button .p-button-label {
  display: none !important;
  ::ng-deep .p-menu.p-menu-overlay {
  left: auto !important;
  right: 0 !important; /* buttonning o'ng tarafida chiqadi */
}
}`,
})
export class CustomTable implements OnInit {
  dataItemDialog: boolean = false;

  @Input() data!: any[];

  data_item!: any;

  @Input() data_item_structure!: Product;
  @Input() excelFieldMapping!: { [key: string]: string };

  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  first = 0;

  rows = 10;

  @Input() tableData!: Column[];
  ngOnInit() {
    this.exportColumns = this.tableData.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  openNew() {
    this.data_item = this.data_item_structure;
    this.submitted = false;
    this.dataItemDialog = true;
  }
  isLastPage(): boolean {
    return this.data ? this.first + this.rows >= this.data.length : true;
  }

  isFirstPage(): boolean {
    return this.data ? this.first === 0 : true;
  }
  hideDialog() {
    this.dataItemDialog = false;
    this.submitted = false;
  }
  findIndexById(id: number): number {
    return this.data.findIndex((product) => product.id === id);
  }
  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  editProduct(product: Product) {
    this.data_item = { ...product };
    this.dataItemDialog = true;
  }
  deleteProduct(product: Product) {
    console.log(product);

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.transh + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'No',
        severity: 'secondary',
        variant: 'text',
      },
      acceptButtonProps: {
        severity: 'danger',
        label: 'Yes',
      },
      accept: () => {
        this.data = this.data.filter((val) => val.transh !== product.transh);
        console.log(this.data);
        this.data_item = this.data_item_structure;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  importExcel(event: any) {
    const file: File = event.files[0];

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { raw: true });

      const importedData: any[] = (data as any[]).map((row, index) => {
        const newItem: Record<string, any> = {
          id: Date.now() + index,
        };

        for (const excelKey in this.excelFieldMapping) {
          const productField = this.excelFieldMapping[excelKey];

          if (productField === 'doc_date' && row[excelKey]) {
            newItem[productField] = new Date(row[excelKey]);
          } else if (
            typeof this.data_item_structure?.[productField] === 'number'
          ) {
            newItem[productField] = Number(row[excelKey]) || 0;
          } else {
            newItem[productField] = row[excelKey] || '';
          }
        }

        return newItem;
      });

      this.data = [...this.data, ...importedData];

      this.messageService.add({
        severity: 'success',
        summary: 'Excel import',
        detail: `${importedData.length} ta mahsulot import qilindi.`,
        life: 3000,
      });
    };

    reader.readAsBinaryString(file);
  }

  saveProduct() {
    this.submitted = true;

    if (!this.data_item.id) {
      // Creating item
      const newItem = { ...this.data_item };

      newItem.id = Math.floor(Math.random() * 100000);

      this.data.push(newItem);

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Item Created',
        life: 3000,
      });
    } else {
      // Updating item
      const index = this.findIndexById(this.data_item.id);

      if (index !== -1) {
        this.data[index] = { ...this.data_item };

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Item Updated',
          life: 3000,
        });
      }
    }

    this.data = [...this.data];

    this.dataItemDialog = false;

    this.data_item = { ...this.data_item_structure };
  }

  activeProductId: number | null = null;

  toggle(productId: number) {
    this.activeProductId =
      this.activeProductId === productId ? null : productId;
  }
}
