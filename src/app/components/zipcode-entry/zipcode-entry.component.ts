import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectLoadingConditions } from 'app/store/weather/weather-selectors';
import { CustomValidators } from 'app/validators/custom-validators';
import { Observable } from 'rxjs';

import { LocationService } from '../../location.service';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html',
    styleUrls: ['./zipcode-entry.component.css']
})
export class ZipcodeEntryComponent {

    zipCodeControl = new FormControl('', null, CustomValidators.zipcodeEntryValidator(this.store));
    protected loadingConditions$: Observable<boolean> = this.store.select(selectLoadingConditions);

    constructor(
        private service: LocationService,
        private store: Store
    ) { }

    addLocation() {
        if (this.zipCodeControl.invalid) return;

        this.service.addLocation(this.zipCodeControl.value);
        this.zipCodeControl.reset();
    }
}
