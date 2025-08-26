import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Transh } from './components/pages/mfi/transh/transh';
import { AgentList } from './components/pages/agents/agent-list/agent-list';
import { MfiCreditLine } from './components/pages/mfi/credit-line/credit-line';
import { FormsPage } from './components/pages/mfi/forms/forms';
import { Test } from './components/pages/mfi/test/test';
import { RxJs } from './components/pages/mfi/rx-js/rx-js';
import { DataBinding } from './components/pages/mfi/data-binding/data-binding';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'mfi',
        children: [
          { path: '', redirectTo: 'credit-line', pathMatch: 'full' },
          {
            path: 'credit-line',
            loadComponent: () =>
              import('./components/pages/mfi/credit-line/credit-line').then(
                (res) => res.MfiCreditLine
              ),
          },
          {
            path: 'transh',
            loadComponent: () =>
              import('./components/pages/mfi/transh/transh').then(
                (res) => res.Transh
              ),
          },
          {
            path: 'forms',
            loadComponent: () =>
              import('./components/pages/mfi/forms/forms').then(
                (res) => res.FormsPage
              ),
          },
          {
            path: 'test',
            loadComponent: () =>
              import('./components/pages/mfi/test/test').then(
                (res) => res.Test
              ),
          },
          {
            path: 'rx-js',
            loadComponent: () =>
              import('./components/pages/mfi/rx-js/rx-js').then(
                (res) => res.RxJs
              ),
          },
          {
            path: 'data-binding',
            loadComponent: () =>
              import('./components/pages/mfi/data-binding/data-binding').then(
                (res) => res.DataBinding
              ),
          },
        ],
      },
      {
        path: 'agents',
        children: [
          { path: '', redirectTo: 'agents-list', pathMatch: 'full' },
          {
            path: 'agents-list',
            loadComponent: () =>
              import('./components/pages/agents/agent-list/agent-list').then(
                (res) => res.AgentList
              ),
          },
        ],
      },
    ],
  },
];
