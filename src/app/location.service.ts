import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { WeatherActions } from 'app/store/weather/weather-action-types';

import { WeatherService } from './weather.service';

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {

    locations: string[] = [];

    constructor(
        private weatherService: WeatherService,
        private store: Store
    ) {
        let locString = localStorage.getItem(LOCATIONS);
        if (locString)
            this.locations = JSON.parse(locString);
        for (let loc of this.locations)
            this.weatherService.addCurrentConditions(loc);
    }

    addLocation(zipcode: string) {
        this.locations.push(zipcode);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));

        this.store.dispatch(WeatherActions.loadCurrentConditionsAction({ zipcode }));
    }

    removeLocation(location: ConditionsAndZip) {
        let index = this.locations.indexOf(location.zip);
        if (index !== -1) {
            this.locations.splice(index, 1);
            localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));

            this.store.dispatch(WeatherActions.removeCurrentConditionsAction({ conditionsAndZip: location }));
        }
    }
}
