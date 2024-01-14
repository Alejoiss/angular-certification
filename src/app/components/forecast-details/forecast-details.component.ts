import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { List } from 'app/components/forecasts-list/forecast.type';
import { WeatherService } from 'app/weather.service';

@Component({
    selector: 'app-forecast-details',
    templateUrl: './forecast-details.component.html',
    styleUrl: './forecast-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastDetailsComponent implements OnInit{
    @Input() dailyForecast: List;

    private weatherService = inject(WeatherService);

    icon: string = '';

    ngOnInit(): void {
        // Removed the function called in template to avoid performance issues
        this.icon = this.weatherService.getWeatherIcon(this.dailyForecast.weather[0].id);
    }
}
