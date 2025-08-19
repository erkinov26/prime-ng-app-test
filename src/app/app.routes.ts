import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Transh } from './components/pages/mfi/transh/transh';
import { AgentList } from './components/pages/agents/agent-list/agent-list';
import { MfiCreditLine } from './components/pages/mfi/credit-line/credit-line';
import { FormsPage } from './components/pages/mfi/forms/forms';
import { Test } from './components/pages/mfi/test/test';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'mfi',
        children: [
          { path: '', redirectTo: 'credit-line', pathMatch: 'full' },
          { path: 'credit-line', component: MfiCreditLine },
          { path: 'transh', component: Transh },
          { path: 'forms', component: FormsPage },
          { path: 'test', component: Test },
        ],
      },
      {
        path: 'agents',
        children: [
          { path: '', redirectTo: 'agents-list', pathMatch: 'full' },
          { path: 'agents-list', component: AgentList },
        ],
      },
    ],
  },
];
