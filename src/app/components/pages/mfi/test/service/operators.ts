import { UntypedFormGroup } from '@angular/forms';
import { map, OperatorFunction } from 'rxjs';

export const takeFormValue = <T>(): OperatorFunction<UntypedFormGroup, T> =>
  map((form: UntypedFormGroup) => {
    console.log(form);
    console.log(form.getRawValue(), 'get raw val');

    return form.getRawValue() as T;
  });
