import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {
  Router,
  RouterLink,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { ListboxModule } from 'primeng/listbox';
import { RippleModule } from 'primeng/ripple';
import { filter } from 'rxjs/operators';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'layout',
  templateUrl: './layout.html',
  imports: [
    BadgeModule,
    InputTextModule,
    CommonModule,
    ButtonModule,
    RouterOutlet,
    ListboxModule,
    RouterLink,
    MenuModule,
    RippleModule,
    AvatarModule,
    MenubarModule,
  ],
  styles: `.active-menu {
  font-weight: bold;
  color: #007ad9;
  background-color: #f0f4ff;
}`,
})
export class Layout implements OnInit {
  items!: MenuItem[];
  router = inject(Router);
  private url = this.router.url;
  currentRoute: string = '';
  constructor() {
    console.log(this.router.url);
  }

  adminRoutes: MenuItem[] = [
    {
      label: 'Credit Line',
      routerLink: 'mfi/credit-line',
    },
    {
      label: 'Transh',
      routerLink: 'mfi/transh',
    },
    {
      label: 'Forms',
      routerLink: 'mfi/forms',
    },
    {
      label: 'Test',
      routerLink: 'mfi/test',
    },
    {
      label: 'RxJS',
      routerLink: 'mfi/rx-js',
    },
    {
      label: 'Data Binding',
      routerLink: 'mfi/data-binding',
    },
    {
      label: 'Patterns',
      routerLink: 'mfi/patterns',
    },
    {
      label: 'Users',
      routerLink: 'mfi/users',
    },
  ];
  agentsRoutes: MenuItem[] = [
    { label: 'Agents List', routerLink: 'agents/agents-list' },
  ];
  ngOnInit() {
    this.setMenuByRoute(this.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setMenuByRoute(event.urlAfterRedirects);
      });
  }
  setMenuByRoute(url: string) {
    if (url.startsWith('/mfi')) {
      this.items = this.adminRoutes.map((item) => ({
        ...item,
        styleClass: url.includes(item.routerLink as string)
          ? 'active-menu'
          : '',
      }));
    } else if (url.startsWith('/agents')) {
      this.items = this.agentsRoutes.map((item) => ({
        ...item,
        styleClass: url.includes(item.routerLink as string)
          ? 'active-menu'
          : '',
      }));
    }
  }
}
