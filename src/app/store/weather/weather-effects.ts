import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherActions } from 'app/store/weather/weather-action-types';
import { WeatherService } from 'app/weather.service';
import { concatMap, filter, map } from 'rxjs/operators';

/* eslint-disable arrow-body-style */
@Injectable()
export class WeatherEffects {

    loadCurrentConditions$ = createEffect(
        () => {
            return this.actions$
                .pipe(
                    ofType(WeatherActions.loadCurrentConditionsAction),
                    filter(data => !!data.zipcode),
                    concatMap(action => this.weatherService.getCurrentConditions(action.zipcode)
                        .pipe(
                            map(currentConditions => ({ currentConditions, zipcode: action.zipcode }))
                        )
                    ),
                    map(({ currentConditions, zipcode }) => WeatherActions.currentConditionsLoadedAction({
                        conditionsAndZip: {
                            id: new Date().getTime(), // create a unique id for store
                            data: currentConditions,
                            zip: zipcode,
                            date: new Date().getTime() // duplicate, because id could be another value
                        }
                    }))
                );
        }
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService
    ) {}
}
