import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { RequestResource } from './request-resource/request-resource';
import { Operation } from "./operation/operation";

@Component({
  selector: 'app-forms-page',
  templateUrl: 'forms.html',
  imports: [TabsModule, RequestResource, Operation],
})
export class FormsPage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor() {}
  active_value: string | number = 'request-resource';
  tabs = [
    { title: 'Request recourse', value: 'request-resource' },
    {
      title: 'Operations',
      value: 'operations',
    },
  ];
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.active_value = params['tab'];
      }
    });
  }

  onTabChange(value: string | number) {
    this.active_value = value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: value },
      queryParamsHandling: 'merge',
    });
  }
}
