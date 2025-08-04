import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AgentsService {
  getAgents() {
    return [
      { id: 1, name: 'Sanoat Qurilish Bank', inn: '123' },
      { id: 2, name: 'Milliy Bank', inn: '456' },
    ];
  }
  constructor() {}
}
