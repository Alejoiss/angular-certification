import { createAction, props } from '@ngrx/store';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';


export const loadCurrentConditionsAction = createAction(
    '[Zip Code Entry Component] Load Conditions for Location',
    props<{zipcode: string}>()
);

export const currentConditionsLoadedAction = createAction(
    '[Weather Effects] Conditions for Location Loaded',
    props<{conditionsAndZip: ConditionsAndZip}>()
);

export const removeCurrentConditionsAction = createAction(
    '[Current Conditions Component] Remove Conditions for Location',
    props<{conditionsAndZip: ConditionsAndZip}>()
);
