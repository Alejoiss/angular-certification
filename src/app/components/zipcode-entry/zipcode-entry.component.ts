import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CustomValidators } from 'app/validators/custom-validators';

import { LocationService } from '../../location.service';

@Component({
    selector: 'app-zipcode-entry',
    templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

    zipCodeControl = new FormControl('', null, CustomValidators.zipcodeEntryValidator(this.store));

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
