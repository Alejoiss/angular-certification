import { createAction, props } from '@ngrx/store';

export const erroGenericoAction = createAction(
    '[Generic Error] Error On Action',
    props<{error: string}>()
);
