/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GenericoActions } from 'app/store/generic/generic-action-types';
import { tap } from 'rxjs/operators';

@Injectable()
export class GenericoEffects {

    erroGenerico$ = createEffect(
        () => {
            return this.actions
                .pipe(
                    ofType(
                        GenericoActions.erroGenericoAction
                    ),
                    tap(action => alert(action.error))
                );
        },
        { dispatch: false }
    );

    constructor(
        private actions: Actions,
    ) {}
}
