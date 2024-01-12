import { EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { currentConditionsAdapter } from 'app/store/weather/weather-reducer';

export interface CurrentConditionsState extends EntityState<ConditionsAndZip> {
    loading: boolean;
}

export const selectCurrentConditionsState = createFeatureSelector<CurrentConditionsState>(
    'currentConditions'
);

export const selectLoadingConditions = createSelector(
    selectCurrentConditionsState,
    state => state.loading
);

export const selectAllCurrentConditions = createSelector(
    selectCurrentConditionsState,
    currentConditionsAdapter.getSelectors().selectAll
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectConditionByZipcode = (zipcode: string) => createSelector(
    selectAllCurrentConditions,
    conditions => conditions.find(c => c.zip === zipcode)
);
