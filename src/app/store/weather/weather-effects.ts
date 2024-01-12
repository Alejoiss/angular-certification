import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
                    concatMap(action => this.weatherService.addCurrentConditions(action.zipcode)
                        .pipe(
                            map(currentConditions => ({ currentConditions, zipcode: action.zipcode }))
                        )
                    ),
                    map(({ currentConditions, zipcode }) => WeatherActions.currentConditionsLoadedAction({
                        conditionsAndZip: {
                            id: new Date().getTime(),
                            data: currentConditions,
                            zip: zipcode
                        }
                    }))
                );
        }
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
        private store: Store
    ) {}
}
