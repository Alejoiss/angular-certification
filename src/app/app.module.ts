import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConditionsDetailsComponent } from 'app/components/conditions-details/conditions-details.component';
import { ForecastDetailsComponent } from 'app/components/forecast-details/forecast-details.component';
import { TabItemComponent } from 'app/components/tabs/tab-item/tab-item.component';
import { TabsComponent } from 'app/components/tabs/tabs.component';
import { GenericoEffects } from 'app/store/generic/generic-effects';
import { WeatherEffects } from 'app/store/weather/weather-effects';
import { WeatherReducer } from 'app/store/weather/weather-reducer';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
        StoreModule.forRoot({ 'currentConditions': WeatherReducer }, {}),
        EffectsModule.forRoot([WeatherEffects, GenericoEffects]),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal
        }),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        ConditionsDetailsComponent,
        MainPageComponent,
        TabsComponent,
        TabItemComponent,
        ForecastDetailsComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
