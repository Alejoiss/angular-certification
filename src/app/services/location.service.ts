import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { DataStorage } from 'app/data-storage';
import { LocalStorageService } from 'app/services/local-storage.service';
import { WeatherActions } from 'app/store/weather/weather-action-types';

export const LOCATIONS: string = 'locations';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(
        private store: Store,
        private localStorageService: LocalStorageService
    ) {
        this.loadStoragedConditions();
    }

    loadStoragedConditions() {
        this.localStorageService.setActiveData('current');
        const currents = this.localStorageService.getDataFromJson('current');

        currents.forEach((c: DataStorage) => {
            if (c.active) {
                this.store.dispatch(WeatherActions.currentConditionsLoadedAction({ conditionsAndZip: c.data }));
            } else {
                this.store.dispatch(WeatherActions.loadCurrentConditionsAction({ zipcode: c.zip }));
            }
        });

        this.localStorageService.clearInactivatedData('current');
    }

    addLocation(zipcode: string) {
        this.store.dispatch(WeatherActions.loadCurrentConditionsAction({ zipcode }));
    }

    removeLocation(location: ConditionsAndZip) {
        this.store.dispatch(WeatherActions.removeCurrentConditionsAction({ conditionsAndZip: location }));
    }
}
