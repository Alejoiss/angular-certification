import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { WeatherActions } from 'app/store/weather/weather-action-types';

export const currentConditionsAdapter = createEntityAdapter<ConditionsAndZip>({});

export const weatherInitialState = currentConditionsAdapter.getInitialState({
    loading: false
});

export const WeatherReducer = createReducer(
    weatherInitialState,

    on(WeatherActions.loadCurrentConditionsAction, (state, action) =>
        ({
            ...state,
            loading: true
        })
    ),
    on(WeatherActions.currentConditionsLoadedAction, (state, action) =>
        currentConditionsAdapter.addOne(action.conditionsAndZip, {
            ...state,
            loading: false
        })
    ),
    on(WeatherActions.removeCurrentConditionsAction, (state, action) =>
        currentConditionsAdapter.removeOne(action.conditionsAndZip.id, state)
    )
);
