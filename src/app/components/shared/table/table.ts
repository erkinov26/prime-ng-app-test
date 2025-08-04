import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayModule } from 'primeng/overlay';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

import * as XLSX from 'xlsx';
import { MenuModule } from 'primeng/menu';
import { CommonModule, DatePipe } from '@angular/common';
interface ExportColumn {
  title: string;
  dataKey: string;
}

export interface Column {
  header: string;
  field: string;
  type: 'string' | 'date' | 'select';
  customExportHeader?: string;
  options?: { code: string; name: string }[]; // <-- ixtiyoriy qildik
}

@Component({
  selector: 'custom-table',
  templateUrl: 'table.html',
  standalone: true,
  imports: [
    SelectModule,
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
    ToastModule,
    MenuModule,
    DatePipe,
    CommonModule,
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
  //INPUTS
  @Input() isImportVisible: boolean = false;
  @Input() isExportVisible: boolean = false;
  @Input() isDeleteSelectionVisible: boolean = false;
  @Input() data!: any[];
  @Input() data_item_structure!: any;
  @Input() excelFieldMapping!: { [key: string]: string };
  @Input() tableData!: Column[];

  @ViewChild('dt') dt!: Table;

  // Variables
  dataItemDialog: boolean = false;
  data_item!: any;
  submitted: boolean = false;
  selectedProducts!: any[] | null;
  cols!: Column[];
  exportColumns!: ExportColumn[];
  first = 0;
  rows = 10;
  activeDataID: number | null = null;
  
  // Injections
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private cd = inject(ChangeDetectorRef);

  // Life Sycle
  ngOnInit() {
    this.data_item = this.data_item_structure;
    this.cd.markForCheck();

    this.exportColumns = this.tableData.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  // Pagination
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
  isLastPage(): boolean {
    return this.data ? this.first + this.rows >= this.data.length : true;
  }
  isFirstPage(): boolean {
    return this.data ? this.first === 0 : true;
  }

  //Table Utils
  findIndexById(id: number): number {
    return this.data.findIndex((data_item) => data_item.id === id);
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

  //Table CRUD
  openNew() {
    this.data_item = this.data_item_structure;
    this.submitted = false;
    this.dataItemDialog = true;
  }
  hideDialog() {
    this.data_item = this.data_item_structure;
    this.dataItemDialog = false;
    this.submitted = false;
  }

  editData(value: any) {
    this.data_item = { ...value };
    this.dataItemDialog = true;
  }
  deleteData(data_item: any) {
    console.log(data_item);

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + data_item.id + '?',
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
        this.data = this.data.filter((val) => val.id !== data_item.id);
        console.log(this.data);
        this.data_item = this.data_item_structure;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Data Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
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
        this.data = this.data.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
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
          const dataItemField = this.excelFieldMapping[excelKey];

          if (dataItemField === 'doc_date' && row[excelKey]) {
            newItem[dataItemField] = new Date(row[excelKey]);
          } else if (
            typeof this.data_item_structure?.[dataItemField] === 'number'
          ) {
            newItem[dataItemField] = Number(row[excelKey]) || 0;
          } else {
            newItem[dataItemField] = row[excelKey] || '';
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

  saveData() {
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

  toggle(data_item_id: number) {
    this.activeDataID =
      this.activeDataID === data_item_id ? null : data_item_id;
  }
}
