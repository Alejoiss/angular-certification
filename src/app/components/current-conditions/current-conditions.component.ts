import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllCurrentConditions, selectLoadingConditions } from 'app/store/weather/weather-selectors';
import { Observable } from 'rxjs';

import { ConditionsAndZip } from '../../conditions-and-zip.type';
import { LocationService } from '../../location.service';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

    private router = inject(Router);

    protected locationService: LocationService = inject(LocationService);
    protected currentConditionsByZip$: Observable<ConditionsAndZip[]> = this.store.select(selectAllCurrentConditions);
    protected loadingConditions$: Observable<boolean> = this.store.select(selectLoadingConditions);

    constructor(
        private store: Store
    ) { }

    showForecast(e: MouseEvent, zipcode: string) {
        if (!(e.target as HTMLElement).closest('.close'))
            this.router.navigate(['/forecast', zipcode])
    }
}
