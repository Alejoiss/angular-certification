import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';

const appRoutes: Routes = [
    {
        path: '', component: MainPageComponent
    },
    {
        path: 'forecast/:zipcode', loadComponent: () => import('./components/forecasts-list/forecasts-list.component').then(m => m.ForecastsListComponent)
    }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {});
