import { InjectionToken } from '@angular/core';

export interface Environments {
  production: boolean;
  brand: string;
  appHost: string;
  socketUrl?: string;
  assetsHost: string;
}
export const ENVIRONMENTS = new InjectionToken<Environments>('ENVIRONMENTS');
