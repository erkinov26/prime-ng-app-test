import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { Documents } from './documents/documents';
import { Receipts } from './receipts/receipts';
@Component({
  selector: 'transh-tabs',
  standalone: true,
  templateUrl: 'transh-tabs.html',
  imports: [TabsModule, Documents, Receipts],
})
export class TranshTabs implements OnInit {
  avtive_value: string | number = 'transh-documents';

  tabs = [
    { title: 'Documents', value: 'transh-documents' },
    { title: 'Receipts', value: 'transh-receipts' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.avtive_value = params['tab'];
      }
    });
  }

  onTabChange(value: string | number) {
    this.avtive_value = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: value },
      queryParamsHandling: 'merge',
    });
  }
}
