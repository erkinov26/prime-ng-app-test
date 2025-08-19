import { Inject, Injectable, Optional } from '@angular/core';
import {
  ENVIRONMENTS,
  Environments,
} from '../interfaces/environments.interface';
import { XARIDLAR_DEFAULT_ENV } from '../interfaces/default-environment-values';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private readonly environments: Environments;

  constructor(
    @Optional() @Inject(ENVIRONMENTS) environments: Environments | null
  ) {
    this.environments = environments ?? XARIDLAR_DEFAULT_ENV;
  }

  public getEnvironments(): Environments {
    return this.environments;
  }
}
