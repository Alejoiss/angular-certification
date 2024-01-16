import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllCurrentConditions } from 'app/store/weather/weather-selectors';
import { Observable } from 'rxjs';

import { ConditionsAndZip } from '../../conditions-and-zip.type';
import { LocationService } from '../../services/location.service';
import { AsyncPipe } from '@angular/common';
import { ConditionsDetailsComponent } from '../conditions-details/conditions-details.component';
import { TabItemComponent } from '../tabs/tab-item/tab-item.component';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css'],
    standalone: true,
    imports: [TabsComponent, TabItemComponent, ConditionsDetailsComponent, AsyncPipe]
})
export class CurrentConditionsComponent {

    private router = inject(Router);

    protected locationService: LocationService = inject(LocationService);
    protected currentConditionsByZip$: Observable<ConditionsAndZip[]> = this.store.select(selectAllCurrentConditions);

    constructor(
        private store: Store
    ) { }

    showForecast(e: MouseEvent, zipcode: string) {
        if (!(e.target as HTMLElement).closest('.close'))
            this.router.navigate(['/forecast', zipcode])
    }
}
