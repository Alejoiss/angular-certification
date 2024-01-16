import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from 'app/services/local-storage.service';
import { WeatherService } from 'app/services/weather.service';
import { GenericoActions } from 'app/store/generic/generic-action-types';
import { WeatherActions } from 'app/store/weather/weather-action-types';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';

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
                            map(currentConditions => ({ currentConditions, zipcode: action.zipcode })),
                            map(({ currentConditions, zipcode }) => WeatherActions.currentConditionsLoadedAction({
                                conditionsAndZip: {
                                    id: new Date().getTime(), // create a unique id for store
                                    data: currentConditions,
                                    zip: zipcode
                                }
                            })),
                            tap(data => this.localStorageService.createDataStorage(data.conditionsAndZip, data.conditionsAndZip.zip, 'current')),
                            catchError(error => [
                                GenericoActions.erroGenericoAction({ error: error.error.message }),
                                WeatherActions.disableLoadingAction()
                            ])
                        )
                    ),
                );
        }
    );

    removeCurrentConditions$ = createEffect(
        () => {
            return this.actions$
                .pipe(
                    ofType(WeatherActions.removeCurrentConditionsAction),
                    tap(action => this.localStorageService.removeDataStorageByZip(action.conditionsAndZip.zip, 'current')),
                );
        },
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
        private localStorageService: LocalStorageService
    ) { }
}
