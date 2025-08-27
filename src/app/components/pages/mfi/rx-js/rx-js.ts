import { Component, inject, OnInit } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { FirstExample } from './first-example/first-example';
import { ActivatedRoute, Router } from '@angular/router';
import { SecondExample } from './second-example/second-example';
import { MergeMap } from './merge-map/merge-map';
import { SwitchMap } from './switch-map/switch-map';
import { DistinctUntilChanged } from './distinct-until-changed/distinct-until-changed';
import { ThrottleTime } from './throttle-time/throttle-time';
import { ForkJoin } from './fork-join/fork-join';

@Component({
  selector: 'app-rx-js',
  template: `
    <p-tabs
      [value]="active_value"
      (valueChange)="onTabChange($event)"
      scrollable
    >
      <p-tablist>
        @for(tab of tabs; track tab.value){
        <p-tab [value]="tab.value">
          {{ tab.title }}
        </p-tab>
        }
      </p-tablist>
      <p-tabpanels>
        <p-tabpanel value="example-1"> <app-first-example /> </p-tabpanel>
        <p-tabpanel value="example-2"> <app-second-example /> </p-tabpanel>
        <p-tabpanel value="merge-map"> <app-merge-map /> </p-tabpanel>
        <p-tabpanel value="switch-map"> <app-switch-map /> </p-tabpanel>
        <p-tabpanel value="throttle"> <app-throttle-time /> </p-tabpanel>
        <p-tabpanel value="fork"> <app-fork-join /> </p-tabpanel>
        <p-tabpanel value="distinct-until-changed">
          <app-distinct-until-changed />
        </p-tabpanel>
      </p-tabpanels>
    </p-tabs>
  `,
  styleUrls: ['./rx-js.css'],
  imports: [
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    FirstExample,
    SecondExample,
    MergeMap,
    SwitchMap,
    DistinctUntilChanged,
    ThrottleTime,
    ForkJoin,
  ],
  standalone: true,
})
export class RxJs implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  active_value: string | number = 'comission';
  tabs = [
    { title: 'Example 1', value: 'example-1' },
    { title: 'Example 2', value: 'example-2' },
    { title: 'Merge Map', value: 'merge-map' },
    { title: 'Switch Map', value: 'switch-map' },
    { title: 'Fork Join', value: 'fork' },
    { title: 'distinct-until-changed', value: 'distinct-until-changed' },
    { title: 'Throttle Time', value: 'throttle' },
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
