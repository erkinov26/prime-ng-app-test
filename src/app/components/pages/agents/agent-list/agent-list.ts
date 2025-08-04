import { Component, inject, OnInit } from '@angular/core';
import { Column, CustomTable } from '../../../shared/table/table';
import { AgentsService } from '../services/agents.service';

export interface AgentsDataType {
  id: number;
  name: string;
  inn: string;
}
@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.html',
  imports: [CustomTable],
})
export class AgentList {
  agentsService = inject(AgentsService);
  agentTableCols: Column[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string',
      customExportHeader: 'Agent Name',
    },
    {
      header: 'INN',
      type: 'string',
      field: 'inn',
    },
  ];

  agentsData: AgentsDataType[] = [];
  agentStructure: AgentsDataType = {
    id: 0,
    name: '',
    inn: '',
  };

  constructor() {
    this.agentsData = this.agentsService.getAgents();
  }
}
