import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataStorage } from 'app/data-storage';
import { LocalStorageService } from 'app/services/local-storage.service';
import { WeatherService } from 'app/services/weather.service';
import { tap } from 'rxjs/operators';

import { Forecast } from './forecast.type';
import { ForecastDetailsComponent } from '../forecast-details/forecast-details.component';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css'],
    standalone: true,
    imports: [ForecastDetailsComponent, RouterLink]
})
export class ForecastsListComponent implements OnInit {
    zipcode: string;
    forecast: Forecast;

    constructor(
        private weatherService: WeatherService,
        private route: ActivatedRoute,
        private localStorageService: LocalStorageService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.zipcode = params['zipcode'];
            this.checkForecast();
        });
    }

    checkForecast(): void {
        this.localStorageService.setActiveData('forecast');
        const forecasts = this.localStorageService.getDataFromJson('forecast');

        this.forecast = forecasts.find((f: DataStorage) => f.zip === this.zipcode && f.active)?.data;

        if (!this.forecast) {
            this.weatherService.getForecast(this.zipcode)
                .pipe(
                    tap(data => this.localStorageService.createDataStorage(data, this.zipcode, 'forecast'))
                )
                .subscribe(data => this.forecast = data);
        }

        this.localStorageService.clearInactivatedData('forecast');
    }
}
