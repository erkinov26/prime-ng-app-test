import { UntypedFormGroup } from '@angular/forms';
import { map, OperatorFunction } from 'rxjs';

export const takeFormValue = <T>(): OperatorFunction<UntypedFormGroup, T> =>
  map((form: UntypedFormGroup) => form.getRawValue() as T);
