import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectConditionByZipcode } from 'app/store/weather/weather-selectors';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';

export class CustomValidators {
    // Validator to avoid duplicated zipcodes
    static zipcodeEntryValidator(store: Store): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control?.value)
                return of(null);

            return store.select(selectConditionByZipcode(control.value))
                .pipe(
                    map(condition => {
                        return !!condition ?  { duplicatedZipcode: true } : null;
                    }),
                    first()
                );
        };
    }
}
